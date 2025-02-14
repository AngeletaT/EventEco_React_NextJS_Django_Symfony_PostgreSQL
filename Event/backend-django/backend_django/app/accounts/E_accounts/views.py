from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from drf_yasg.utils import swagger_auto_schema
from backend_django.app.accounts.E_accounts.serializers import (
     E_ClientRegisterSerializer,
     E_ClientLoginSerializer,
     E_ClientMeSerializer,
     E_ClientLogoutSerializer
)

# 🚀 REGISTER
class E_ClientRegisterView(APIView):
     permission_classes = [permissions.AllowAny]

     @swagger_auto_schema(
          request_body=E_ClientRegisterSerializer,
          responses={201: E_ClientRegisterSerializer(), 400: "Error en la solicitud"}
     )
     def post(self, request):
          serializer = E_ClientRegisterSerializer(data=request.data)
          if serializer.is_valid():
               user = serializer.save()
               return Response(E_ClientRegisterSerializer(user).data, status=status.HTTP_201_CREATED)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 LOGIN
class E_ClientLoginView(APIView):
     permission_classes = [permissions.AllowAny]

     @swagger_auto_schema(
          request_body=E_ClientLoginSerializer,
          responses={200: E_ClientLoginSerializer(), 401: "Credenciales incorrectas"}
     )
     def post(self, request):
          serializer = E_ClientLoginSerializer(data=request.data)
          if serializer.is_valid():
               return Response(serializer.validated_data, status=status.HTTP_200_OK)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 ME
class E_ClientMeView(APIView):
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(responses={200: E_ClientMeSerializer(), 401: "No autenticado"})
     def get(self, request):
          access_token = request.headers.get("Authorization", "").split("Bearer ")[-1]

          try:
               decoded_token = AccessToken(access_token)
               email = decoded_token["email"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

          serializer = E_ClientMeSerializer(data={"email": email, "accesstoken": access_token})
          if serializer.is_valid():
               return Response(serializer.validated_data, status=status.HTTP_200_OK)
          return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

# 🚀 LOGOUT
class E_ClientLogoutView(APIView):
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(responses={200: E_ClientLogoutSerializer(), 401: "No autenticado"})
     def post(self, request):
          email = request.user.email
          serializer = E_ClientLogoutSerializer(data={"email": email})
          if serializer.is_valid():
               return Response(serializer.validated_data, status=status.HTTP_200_OK)
          return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
