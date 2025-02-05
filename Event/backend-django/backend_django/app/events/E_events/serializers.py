from rest_framework import serializers
from .models import E_Event
from backend_django.app.categories.E_categories.serializers import E_EventCategorySerializer

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
               'orgid',
               'idcategory',
               'category',
               'createdat',
               'updatedat',
          ]