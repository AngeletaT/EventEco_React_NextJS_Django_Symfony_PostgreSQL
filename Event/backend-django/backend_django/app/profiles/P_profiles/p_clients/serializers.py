from rest_framework import serializers
from backend_django.app.profiles.P_profiles.p_clients.models import P_ProfileClient

class P_ProfileClientSerializer(serializers.ModelSerializer):
     """
     Serializador para obtener y actualizar perfiles de clientes de PaWnity.
     """

     class Meta:
          model = P_ProfileClient
          fields = [
               "idprofileclient",
               "idclient",
               "firstname",
               "lastname",
               "phonenumber",
               "dni",
               "bio",
               "avatarurl",
               "createdat",
               "updatedat",
          ]
          read_only_fields = [
               "idprofileclient",  # No se modifica
               "idclient",         # Se obtiene del token
               "createdat",        # No se modifica
               "updatedat",        # Se actualiza automáticamente en BD
          ]

     def update(self, instance, validated_data):
          """
          Permite la actualización de los campos específicos del perfil.
          """
          # Solo permitimos actualizar estos campos
          allowed_fields = {
               "firstname",
               "lastname",
               "phonenumber",
               "dni",
               "bio",
               "avatarurl"
          }
          
          for attr, value in validated_data.items():
               if attr in allowed_fields:
                    setattr(instance, attr, value)

          instance.save()
          return instance
