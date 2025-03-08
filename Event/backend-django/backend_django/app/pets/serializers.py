from rest_framework import serializers
from .models import Pet, Sponsorship, Adoption
from backend_django.app.profiles.P_profiles.organizers.serializers import ProfileOrganizerSerializer

class PetSerializer(serializers.ModelSerializer):
     """
     Serializador para las mascotas.
     """
     organizer = ProfileOrganizerSerializer(source='idorg', read_only=True)

     class Meta:
          model = Pet
          fields = [
               'idpet',
               'uuidpet',
               'name',
               'species',
               'breed',
               'gender',
               'birthdate',
               'description',
               'image',
               'status',
               'idorg',
               'organizer',
               'createdat',
               'updatedat'
          ]

class PetFilterSerializer(serializers.Serializer):
     """
     Serializador para manejar los filtros de la lista de mascotas.
     """
     gender = serializers.ChoiceField(choices=['macho', 'hembra'], required=False)
     idorg = serializers.IntegerField(required=False)
     species = serializers.ChoiceField(choices=['perro', 'gato'], required=False)
     page = serializers.IntegerField(min_value=1, required=False, default=1)

     def filter_pets(self, queryset):
          """
          Aplica los filtros al queryset de mascotas.
          """
          filters = self.validated_data

          if 'gender' in filters:
               queryset = queryset.filter(gender=filters['gender'])

          if 'idorg' in filters:
               queryset = queryset.filter(idorg=filters['idorg'])

          if 'species' in filters:
               queryset = queryset.filter(species=filters['species'])

          return queryset

class AdoptionCreationSerializer(serializers.ModelSerializer):
     """
     Serializador para la creación y activación/desactivación de solicitudes de adopción.
     """

     class Meta:
          model = Adoption
          fields = ['idorg', 'idpet']

     def create(self, validated_data):
          """
          Busca o crea una adopción con idclient. Si ya existe, cambia el estado de `isactive`.
          """
          idclient = self.context.get('idclient')
          if not idclient:
               raise serializers.ValidationError({"message": "No se ha proporcionado un idclient válido."})

          adoption, created = Adoption.objects.get_or_create(
               idclient=idclient,
               idpet=validated_data["idpet"],
               defaults={"idorg": validated_data["idorg"], "isactive": True}
          )

          if created:
               return adoption, "created"

          elif not adoption.isactive:
               adoption.isactive = True
               adoption.save()
               return adoption, "reactivated"

          else:
               adoption.isactive = False
               adoption.save()
               return adoption, "deactivated"

class SponsorshipCreationSerializer(serializers.ModelSerializer):
     """
     Serializador para la creación y activación/desactivación de suscripciones/apadrinamientos.
     """

     class Meta:
          model = Sponsorship
          fields = ['idorg', 'idpet']

     def create(self, validated_data):
          """
          Busca o crea una suscripción con idclient. Si ya existe, cambia el estado de `isactive`.
          """
          idclient = self.context.get('idclient')
          if not idclient:
               raise serializers.ValidationError({"message": "No se ha proporcionado un idclient válido."})

          sponsorship, created = Sponsorship.objects.get_or_create(
               idclient=idclient,
               idorg=validated_data["idorg"],
               defaults={"idpet": validated_data["idpet"], "isactive": True}
          )

          if created:
               return sponsorship, "created"

          elif not sponsorship.isactive:
               sponsorship.isactive = True
               sponsorship.save()
               return sponsorship, "reactivated"

          else:
               sponsorship.isactive = False
               sponsorship.save()
               return sponsorship, "deactivated"

class GetMySponsorshipsSerializer(serializers.ModelSerializer):
     """
     Serializador para obtener todas las suscripciones activas del cliente.
     Incluye los detalles de la organización y la mascota.
     """

     pet = PetSerializer(source='idpet', read_only=True)  # 🔗 Datos de la mascota

     class Meta:
          model = Sponsorship
          fields = [
               'idsponsorship',
               'idclient',
               'idorg',
               'idpet',
               'pet',  # 🔗 Datos completos de la mascota
               'startdate',
               'enddate',
               'isactive',
               'createdat',
               'updatedat'
          ]

class GetMyAdoptionsSerializer(serializers.ModelSerializer):
     """
     Serializador para obtener todas las adopciones activas del cliente.
     Incluye los detalles de la organización y la mascota.
     """

     pet = PetSerializer(source='idpet', read_only=True)  # 🔗 Datos de la mascota

     class Meta:
          model = Adoption
          fields = [
               'idadoption',
               'idclient',
               'idorg',
               'idpet',
               'pet',  # 🔗 Datos completos de la mascota
               'adoptiondate',
               'lastreviewdate',
               'isactive',
               'createdat',
               'updatedat'
          ]

