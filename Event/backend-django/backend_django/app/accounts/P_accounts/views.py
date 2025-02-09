from django.contrib.auth import authenticate
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.core.cache import cache
from drf_yasg.utils import swagger_auto_schema
from backend_django.app.accounts.P_accounts.models import P_Client
from backend_django.app.accounts.P_accounts.serializers import (
     P_ClientRegisterSerializer,
     P_ClientLoginSerializer,
     P_ClientMeSerializer,
     P_ClientLogoutSerializer
)
import redis
import json

# Configuración de Redis
redis_client = redis.StrictRedis(host="redis-container", port=6379, db=1,password="12345678", decode_responses=True)

# 🚀 REGISTER
class P_ClientRegisterView(APIView):
     """
     Endpoint para registrar un cliente de Pawnity.
     """
     permission_classes = [permissions.AllowAny]

     @swagger_auto_schema(
          request_body=P_ClientRegisterSerializer,
          responses={201: P_ClientRegisterSerializer(), 400: "Error en la solicitud"}
     )
     def post(self, request):
          """
          Registro de cliente en Pawnity.
          """
          serializer = P_ClientRegisterSerializer(data=request.data)

          if serializer.is_valid():
               user = serializer.save()
               return Response(P_ClientRegisterSerializer(user).data, status=status.HTTP_201_CREATED)

          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 LOGIN
class P_ClientLoginView(APIView):
     """
     Endpoint para iniciar sesión de un cliente de Pawnity.
     """
     permission_classes = [permissions.AllowAny]

     @swagger_auto_schema(
          request_body=P_ClientLoginSerializer,
          responses={200: P_ClientLoginSerializer(), 401: "Credenciales incorrectas"}
     )
     def post(self, request):
          """
          Autenticación del cliente y generación de tokens.
          """
          serializer = P_ClientLoginSerializer(data=request.data)

          if not serializer.is_valid():
               print("❌ Errores del serializer:", serializer.errors)  # Debug
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

          user = serializer.validated_data["user"]  # Recuperamos el usuario desde validate()

          # Generamos access y refresh tokens personalizados
          refresh = RefreshToken.for_user(user)
          access = AccessToken.for_user(user)

          refresh["role"] = "client"
          refresh["email"] = user.email
          refresh["idclient"] = user.idclient  # ✅ Ahora usa `idclient`
          refresh["app"] = "pawnity"

          access["role"] = "client"
          access["email"] = user.email
          access["idclient"] = user.idclient  # ✅ Ahora usa `idclient`
          access["app"] = "pawnity"

          # Guardamos refresh_token en BD
          user.refreshtoken = str(refresh)
          user.save()

          # 🚀 **Guardar access token en Redis con formato JSON**
          redis_key = f"pawnity_client:{user.email}"  # Ahora en carpeta 'pawnity_client'
          redis_value = json.dumps({"accesstoken": str(access)})  # Se guarda como JSON

          try:
               redis_client.setex(redis_key, 86400, redis_value)  # TTL de 1 día
               print(f"✅ Access token guardado en Redis: {redis_value}")  # Debug
          except Exception as e:
               print(f"❌ Error al guardar en Redis: {e}")  # Debug

          return Response(
               {
                    "email": user.email,
                    "idclient": user.idclient,
                    "accesstoken": str(access)
               },
               status=status.HTTP_200_OK
          )

# 🚀 GET CURRENT USER (/me)
class P_ClientMeView(APIView):
     """
     Obtener los datos del usuario autenticado.
     """
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          responses={200: P_ClientMeSerializer(), 401: "No autenticado"}
     )
     def get(self, request):
          """
          Valida el access token y lo compara con Redis.
          """
          # Extraer el token del header
          auth_header = request.headers.get("Authorization", "")
          if not auth_header.startswith("Bearer "):
               return Response({"error": "Token no proporcionado o en formato incorrecto"}, status=status.HTTP_401_UNAUTHORIZED)

          access_token = auth_header.split("Bearer ")[-1]

          try:
               # Decodificar el token para obtener el email
               decoded_token = AccessToken(access_token)
               email = decoded_token["email"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

          # Buscar el token en Redis
          redis_key = f"pawnity_client:{email}"
          redis_value = redis_client.get(redis_key)

          if not redis_value:
               return Response({"error": "Token no encontrado en Redis"}, status=status.HTTP_401_UNAUTHORIZED)

          # Convertir el valor de Redis a JSON
          try:
               redis_data = json.loads(redis_value)
          except json.JSONDecodeError:
               return Response({"error": "Error al procesar los datos de Redis"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

          # Comparar el token recibido con el de Redis
          if access_token != redis_data.get("accesstoken"):
               return Response({"error": "Token no coincide con Redis"}, status=status.HTTP_401_UNAUTHORIZED)

          return Response(
               {
                    "message": "Usuario validado correctamente",
                    "email": email,
                    "accesstoken": access_token
               },
               status=status.HTTP_200_OK
          )

# 🚀 LOGOUT
class P_ClientLogoutView(APIView):
     """
     Endpoint para cerrar sesión y revocar tokens.
     """
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          responses={200: P_ClientLogoutSerializer(), 401: "No autenticado"}
     )
     def post(self, request):
          """
          1️⃣ Recibe el `access_token` por headers.
          2️⃣ Lo decodifica para extraer el `email`.
          3️⃣ Borra el `access_token` de Redis.
          4️⃣ Borra el `refresh_token` en la base de datos.
          5️⃣ Añade el `refresh_token` a la blacklist.
          """
          # 📌 Recuperamos el access_token desde headers
          auth_header = request.headers.get("Authorization", "")
          if not auth_header or not auth_header.startswith("Bearer "):
               return Response({"error": "Token no proporcionado o formato incorrecto"}, status=401)

          access_token = auth_header.split("Bearer ")[-1]

          # 🔑 Decodificar el token
          try:
               decoded_token = AccessToken(access_token)
               email = decoded_token["email"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=401)

          # 📌 Buscar usuario en BD
          user = P_Client.objects.filter(email=email).first()
          if not user:
               return Response({"error": "Usuario no encontrado"}, status=401)

          # 🚨 **Paso 1: Eliminar access token de Redis**
          redis_key = f"pawnity_client:{user.email}"
          redis_client.delete(redis_key)
          print(f"✅ Eliminado en Redis: {redis_key}")  # Debug

          # 🚨 **Paso 2: Blacklistear refresh_token**
          try:
               if user.refreshtoken:
                    refresh = RefreshToken(user.refreshtoken)
                    refresh.blacklist()  # Añadir a la blacklist
                    print(f"✅ Refresh token blacklisteado: {user.refreshtoken}")  # Debug
          except TokenError:
               print("❌ Error: Refresh token ya expirado o inválido.")  # Debug

          # 🚨 **Paso 3: Eliminar refresh_token en BD**
          user.refreshtoken = None
          user.save()
          print(f"✅ Refresh token eliminado en BD para: {user.email}")  # Debug

          return Response(
               {
                    "message": "P_Client ha cerrado sesión correctamente",
                    "email": user.email,
               },
               status=200
          )