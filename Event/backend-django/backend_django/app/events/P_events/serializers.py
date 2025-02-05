from rest_framework import serializers
from .models import P_Event
from backend_django.app.categories.P_categories.serializers import P_EventCategorySerializer

class P_EventSerializer(serializers.ModelSerializer):

     category = P_EventCategorySerializer(source='idcategory', read_only=True)

     class Meta:
          model = P_Event
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
               'category',
               'createdat',
               'updatedat',
          ]