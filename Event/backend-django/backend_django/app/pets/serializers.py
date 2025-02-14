from rest_framework import serializers
from .models import Pet
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
