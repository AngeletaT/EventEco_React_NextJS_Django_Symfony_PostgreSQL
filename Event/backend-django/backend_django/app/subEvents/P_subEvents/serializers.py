from rest_framework import serializers
from .models import P_SubEvent

class P_SubEventSerializer(serializers.ModelSerializer):
     class Meta:
          model = P_SubEvent
          fields = '__all__'
