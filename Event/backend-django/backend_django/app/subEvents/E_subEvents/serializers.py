from rest_framework import serializers
from .models import E_SubEvent

class E_SubEventSerializer(serializers.ModelSerializer):
     class Meta:
          model = E_SubEvent
          fields = '__all__'
