from rest_framework import serializers
from .models import E_Event
from backend_django.app.categories.E_categories.serializers import E_EventCategorySerializer
from backend_django.app.subEvents.E_subEvents.serializers import E_SubEventSerializer 

class E_EventSerializer(serializers.ModelSerializer):
     category = E_EventCategorySerializer(source='idcategory', read_only=True)

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
               'idorg',
               'idcategory',
               'category',
               'createdat',
               'updatedat',
          ]

class E_EventDetailSerializer(serializers.ModelSerializer):
     category = E_EventCategorySerializer(source='idcategory', read_only=True)
     subevents = E_SubEventSerializer(many=True, read_only=True) 

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
               'idorg',
               'idcategory',
               'category',
               'subevents',  
               'createdat',
               'updatedat',
          ]