from rest_framework import serializers
from backend_django.app.accounts.E_accounts.models import E_Client
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

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
          Autenticación y generación de tokens personalizados.
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

          attrs["user"] = user  # Guardamos el usuario validado en attrs
          return attrs
     
class E_ClientMeSerializer(serializers.ModelSerializer):
     """
     Serializador para obtener los datos del usuario autenticado.
     """
     role = serializers.SerializerMethodField()
     app = serializers.SerializerMethodField()

     class Meta:
          model = E_Client
          fields = ['idclient', 'email', 'role', 'app', 'refreshtoken', 'isactive', 'createdat', 'updatedat']

     def get_role(self, obj):
          return "client"

     def get_app(self, obj):
          return "eventeco"


class E_ClientLogoutSerializer(serializers.Serializer):
     """
     Serializador para el logout de clientes de Eventeco.
     """
     message = serializers.CharField(default="E_Client has been successfully logged out")
