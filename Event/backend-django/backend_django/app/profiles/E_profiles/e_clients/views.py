from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from drf_yasg.utils import swagger_auto_schema
from backend_django.app.profiles.E_profiles.e_clients.models import E_ProfileClient
from backend_django.app.profiles.E_profiles.e_clients.serializers import E_ProfileClientSerializer
from django.utils.timezone import now

# 🚀 GET PROFILE (/profile/me)
class E_ProfileClientMeView(APIView):
     """
     Endpoint para obtener el perfil del cliente autenticado.
     Si el perfil no existe, lo crea con valores de ejemplo.
     """
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          responses={200: E_ProfileClientSerializer(), 401: "No autenticado"}
     )
     def get(self, request):
          """
          Obtiene el perfil del usuario autenticado.
          Si no existe, lo crea con datos de ejemplo.
          """
          # 🔍 Extraer token de los headers
          access_token = request.headers.get("Authorization", "").split("Bearer ")[-1]

          try:
               # 🛠️ Decodificar token para extraer "idclient" y "email"
               decoded_token = AccessToken(access_token)
               idclient = decoded_token["idclient"]
               email = decoded_token["email"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

          # 🔍 Buscar perfil en la base de datos
          profile, created = E_ProfileClient.objects.get_or_create(
               idclient=idclient,
               defaults={  # Solo si no existe
                    "firstname": "Nombre de ejemplo",
                    "lastname": "Apellido de ejemplo",
                    "phonenumber": "000-000-000",
                    "dni": "00000000X",
                    "bio": "Bienvenido a EventEco, edita tu perfil!",
                    "avatarurl": f"https://i.pravatar.cc/150?u={email}",
                    "createdat": now(),
                    "updatedat": now(),
               }
          )

          # 🔄 Serializar y devolver la respuesta
          serializer = E_ProfileClientSerializer(profile)
          return Response(serializer.data, status=status.HTTP_200_OK)

# 🚀 UPDATE PROFILE (/profile/me)
class E_ProfileClientUpdateView(APIView):
     """
     Endpoint para actualizar el perfil del cliente autenticado.
     Solo permite modificar ciertos campos específicos.
     """
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          request_body=E_ProfileClientSerializer,
          responses={200: E_ProfileClientSerializer(), 400: "Datos inválidos", 401: "No autenticado", 404: "Perfil no encontrado"}
     )
     def put(self, request):
          """
          Actualiza los datos del perfil del usuario autenticado.
          """
          # 🔍 Extraer token de los headers
          access_token = request.headers.get("Authorization", "").split("Bearer ")[-1]

          try:
               # 🛠️ Decodificar token para extraer "idclient"
               decoded_token = AccessToken(access_token)
               idclient = decoded_token["idclient"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

          # 🔍 Buscar perfil en la base de datos
          try:
               profile = E_ProfileClient.objects.get(idclient=idclient)
          except E_ProfileClient.DoesNotExist:
               return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)

          # 📥 Obtener datos enviados en el JSON
          data = request.data

          # 🔒 Definir los únicos campos permitidos para actualizar
          campos_permitidos = {"firstname", "lastname", "phonenumber", "dni", "bio", "avatarurl"}

          # 📌 Filtrar datos para solo incluir los campos permitidos
          update_data = {key: value for key, value in data.items() if key in campos_permitidos}

          # ⚠️ Si no hay campos válidos en el JSON, devolver error
          if not update_data:
               return Response({"error": "No se enviaron campos válidos para actualizar"}, status=status.HTTP_400_BAD_REQUEST)

          # 🔄 Actualizar perfil con los nuevos valores
          for campo, valor in update_data.items():
               setattr(profile, campo, valor)

          profile.updatedat = now()  # 🕒 Actualizar fecha de modificación
          profile.save()

          # ✅ Serializar y devolver el perfil actualizado
          serializer = E_ProfileClientSerializer(profile)
          return Response(serializer.data, status=status.HTTP_200_OK)