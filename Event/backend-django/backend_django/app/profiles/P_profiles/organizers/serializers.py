from rest_framework import serializers
from .models import ProfileOrganizer

class ProfileOrganizerSerializer(serializers.ModelSerializer):
     class Meta:
          model = ProfileOrganizer
          fields = '__all__'
