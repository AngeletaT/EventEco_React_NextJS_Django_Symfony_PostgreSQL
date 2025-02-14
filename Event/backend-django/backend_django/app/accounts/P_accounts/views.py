from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from drf_yasg.utils import swagger_auto_schema
from backend_django.app.accounts.P_accounts.serializers import (
     P_ClientRegisterSerializer,
     P_ClientLoginSerializer,
     P_ClientMeSerializer,
     P_ClientLogoutSerializer
)

# 🚀 REGISTER
class P_ClientRegisterView(APIView):
     permission_classes = [permissions.AllowAny]

     @swagger_auto_schema(
          request_body=P_ClientRegisterSerializer,
          responses={201: P_ClientRegisterSerializer(), 400: "Error en la solicitud"}
     )
     def post(self, request):
          serializer = P_ClientRegisterSerializer(data=request.data)
          if serializer.is_valid():
               user = serializer.save()
               return Response(P_ClientRegisterSerializer(user).data, status=status.HTTP_201_CREATED)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 LOGIN
class P_ClientLoginView(APIView):
     permission_classes = [permissions.AllowAny]

     @swagger_auto_schema(
          request_body=P_ClientLoginSerializer,
          responses={200: P_ClientLoginSerializer(), 401: "Credenciales incorrectas"}
     )
     def post(self, request):
          serializer = P_ClientLoginSerializer(data=request.data)
          if serializer.is_valid():
               return Response(serializer.validated_data, status=status.HTTP_200_OK)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 ME
class P_ClientMeView(APIView):
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(responses={200: P_ClientMeSerializer(), 401: "No autenticado"})
     def get(self, request):
          access_token = request.headers.get("Authorization", "").split("Bearer ")[-1]

          try:
               decoded_token = AccessToken(access_token)
               email = decoded_token["email"]
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=status.HTTP_401_UNAUTHORIZED)

          serializer = P_ClientMeSerializer(data={"email": email, "accesstoken": access_token})
          if serializer.is_valid():
               return Response(serializer.validated_data, status=status.HTTP_200_OK)
          return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

# 🚀 LOGOUT
class P_ClientLogoutView(APIView):
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(responses={200: P_ClientLogoutSerializer(), 401: "No autenticado"})
     def post(self, request):
          email = request.user.email
          serializer = P_ClientLogoutSerializer(data={"email": email})
          if serializer.is_valid():
               return Response(serializer.validated_data, status=status.HTTP_200_OK)
          return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
