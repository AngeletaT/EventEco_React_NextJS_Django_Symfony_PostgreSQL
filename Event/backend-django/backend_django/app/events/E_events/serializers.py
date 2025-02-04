from rest_framework import serializers
from .models import E_Event

class E_EventSerializer(serializers.ModelSerializer):

     class Meta:
          model = E_Event
          fields = [
               'idevent',
               'name',
               'eventslug',
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

