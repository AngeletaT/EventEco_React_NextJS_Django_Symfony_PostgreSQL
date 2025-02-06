from rest_framework import serializers
from .models import Pet
from backend_django.app.profiles.P_profiles.organizers.serializers import ProfileOrganizerSerializer 

class PetSerializer(serializers.ModelSerializer):
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