from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from drf_yasg.utils import swagger_auto_schema
from backend_django.app.profiles.P_profiles.p_clients.models import P_ProfileClient
from backend_django.app.profiles.P_profiles.p_clients.serializers import P_ProfileClientSerializer


# 🚀 GET PROFILE (/profile/me)
class P_ProfileClientMeView(APIView):
     """
     Endpoint para obtener el perfil del cliente autenticado.
     Si el perfil no existe, lo crea con valores de ejemplo.
     """
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          responses={200: P_ProfileClientSerializer(), 401: "No autenticado"}
     )
     def get(self, request):
          """
          Obtiene el perfil del usuario autenticado.
          Si no existe, lo crea con datos de ejemplo.
          """
          access_token = request.headers.get("Authorization", "").split("Bearer ")[-1]

          try:
               decoded_token = AccessToken(access_token)
               idclient = decoded_token["idclient"]
               email = decoded_token["email"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

          profile = P_ProfileClient.objects.filter(idclient=idclient).first()

          # Si no existe el perfil, crearlo con valores de ejemplo
          if not profile:
               profile = P_ProfileClientSerializer.create_default_profile(idclient, email)

          serializer = P_ProfileClientSerializer(profile)
          return Response(serializer.data, status=status.HTTP_200_OK)


# 🚀 UPDATE PROFILE (/profile/me/update)
class P_ProfileClientUpdateView(APIView):
     """
     Endpoint para actualizar el perfil del cliente autenticado.
     Solo permite modificar ciertos campos específicos.
     """
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          request_body=P_ProfileClientSerializer,
          responses={
               200: P_ProfileClientSerializer(),
               400: "Datos inválidos",
               401: "No autenticado",
               404: "Perfil no encontrado"
          }
     )
     def put(self, request):
          """
          Actualiza los datos del perfil del usuario autenticado.
          """
          access_token = request.headers.get("Authorization", "").split("Bearer ")[-1]

          try:
               decoded_token = AccessToken(access_token)
               idclient = decoded_token["idclient"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

          try:
               profile = P_ProfileClient.objects.get(idclient=idclient)
          except P_ProfileClient.DoesNotExist:
               return Response({"error": "Perfil no encontrado"}, status=status.HTTP_404_NOT_FOUND)

          serializer = P_ProfileClientSerializer(profile, data=request.data, partial=True)

          if serializer.is_valid():
               serializer.save()
               return Response(serializer.data, status=status.HTTP_200_OK)

          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
