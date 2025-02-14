from rest_framework import serializers
from backend_django.app.accounts.E_accounts.models import E_Client
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
import redis
import json

# Configuración de Redis
redis_client = redis.StrictRedis(host="redis-container", port=6379, db=1, password="12345678", decode_responses=True)

class E_ClientRegisterSerializer(serializers.ModelSerializer):
     """
     Serializador para el registro de clientes de Eventeco.
     """
     repeatpassword = serializers.CharField(write_only=True, required=True)

     class Meta:
          model = E_Client
          fields = ['email', 'password', 'repeatpassword', 'refreshtoken', 'isactive', 'createdat', 'updatedat']

     def validate(self, data):
          """Verifica que las contraseñas coincidan."""
          if data['password'] != data['repeatpassword']:
               raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
          return data

     def create(self, validated_data):
          validated_data.pop('repeatpassword')  # Remover antes de guardar en BD
          validated_data['password'] = make_password(validated_data['password'])  # Encriptar con Argon2
          validated_data['refreshtoken'] = None  # Inicializar como None
          return super().create(validated_data)

class E_ClientLoginSerializer(serializers.Serializer):
     """
     Serializador para el login de clientes de Eventeco.
     """
     email = serializers.EmailField(required=True)
     password = serializers.CharField(write_only=True, required=True)

     def validate(self, attrs):
          """
          Autenticación del cliente y generación de tokens personalizados.
          """
          email = attrs.get("email")
          password = attrs.get("password")

          if not email or not password:
               raise serializers.ValidationError({"error": "Email y password son obligatorios"})

          try:
               user = E_Client.objects.get(email=email)
          except E_Client.DoesNotExist:
               raise serializers.ValidationError({"error": "Credenciales incorrectas."})

          if not check_password(password, user.password):
               raise serializers.ValidationError({"error": "Credenciales incorrectas."})

          # Generar tokens personalizados
          refresh = RefreshToken.for_user(user)
          access = AccessToken.for_user(user)

          refresh["role"] = "client"
          refresh["email"] = user.email
          refresh["idclient"] = user.idclient
          refresh["app"] = "eventeco"

          access["role"] = "client"
          access["email"] = user.email
          access["idclient"] = user.idclient
          access["app"] = "eventeco"

          # Guardar refresh_token en BD
          user.refreshtoken = str(refresh)
          user.save()

          # Guardar en Redis
          redis_key = f"eventeco_client:{user.email}"
          redis_value = json.dumps({"accesstoken": str(access)})
          redis_client.setex(redis_key, 86400, redis_value)  # TTL de 1 día

          return {
               "email": user.email,
               "idclient": user.idclient,
               "accesstoken": str(access)
          }

class E_ClientMeSerializer(serializers.Serializer):
     """
     Serializador para validar al usuario autenticado.
     """
     email = serializers.EmailField()
     accesstoken = serializers.CharField()

     def validate(self, attrs):
          """
          Valida el access token con Redis.
          """
          access_token = attrs.get("accesstoken")
          email = attrs.get("email")

          # Buscar en Redis
          redis_key = f"eventeco_client:{email}"
          redis_value = redis_client.get(redis_key)

          if not redis_value:
               raise serializers.ValidationError({"error": "Token no encontrado en Redis"})

          try:
               redis_data = json.loads(redis_value)
          except json.JSONDecodeError:
               raise serializers.ValidationError({"error": "Error al procesar los datos de Redis"})

          if access_token != redis_data.get("accesstoken"):
               raise serializers.ValidationError({"error": "Token no coincide con Redis"})

          return {
               "message": "Usuario validado correctamente",
               "email": email,
               "accesstoken": access_token
          }

class E_ClientLogoutSerializer(serializers.Serializer):
     """
     Serializador para el logout de clientes de Eventeco.
     """
     email = serializers.EmailField()

     def validate(self, attrs):
          """
          Valida el token, elimina la sesión de Redis y blacklistea el refresh token.
          """
          email = attrs.get("email")
          user = E_Client.objects.filter(email=email).first()

          if not user:
               raise serializers.ValidationError({"error": "Usuario no encontrado"})

          # Eliminar token de Redis
          redis_key = f"eventeco_client:{user.email}"
          redis_client.delete(redis_key)

          # Blacklistear el refresh token
          if user.refreshtoken:
               try:
                    refresh = RefreshToken(user.refreshtoken)
                    refresh.blacklist()
               except TokenError:
                    pass  # Token ya expirado o inválido

          # Eliminar refresh token en BD
          user.refreshtoken = None
          user.save()

          return {"message": "E_Client ha cerrado sesión correctamente", "email": user.email}
