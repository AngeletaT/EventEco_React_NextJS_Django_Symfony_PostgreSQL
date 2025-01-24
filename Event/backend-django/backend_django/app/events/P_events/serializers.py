from rest_framework import serializers
from .models import P_Event

class P_EventSerializer(serializers.ModelSerializer):

     class Meta:
          model = P_Event
          fields = [
               'idevent',
               'name',
               'startdate',
               'enddate',
               'location',
               'description',
               'status',
               'urlimage',
               'urlposter',
               'orgid',
               'idcategory',
               'createdat',
               'updatedat',
          ]