from rest_framework import serializers
from backend_django.app.profiles.P_profiles.p_clients.models import P_ProfileClient
from django.utils.timezone import now


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

     def validate(self, data):
          """
          Validaciones adicionales para los campos actualizables.
          """
          allowed_fields = {"firstname", "lastname", "phonenumber", "dni", "bio", "avatarurl"}

          if not any(field in data for field in allowed_fields):
               raise serializers.ValidationError({"error": "No se enviaron campos válidos para actualizar"})

          return data

     def update(self, instance, validated_data):
          """
          Permite la actualización de los campos específicos del perfil.
          """
          allowed_fields = {"firstname", "lastname", "phonenumber", "dni", "bio", "avatarurl"}

          for attr, value in validated_data.items():
               if attr in allowed_fields:
                    setattr(instance, attr, value)

          instance.updatedat = now()  # 🕒 Actualizar fecha de modificación
          instance.save()
          return instance

     @staticmethod
     def create_default_profile(idclient, email):
          """
          Crea un perfil de cliente con valores por defecto si no existe.
          """
          name = email.split("@")[0]
          return P_ProfileClient.objects.create(
               idclient=idclient,
               firstname=f"{name}",
               lastname="Apellido de ejemplo",
               phonenumber="000-000-000",
               dni="00000000X",
               bio="Bienvenido a Pawnity, edita tu perfil!",
               avatarurl=f"https://i.pravatar.cc/150?u={email}",
               createdat=now(),
               updatedat=now(),
          )
