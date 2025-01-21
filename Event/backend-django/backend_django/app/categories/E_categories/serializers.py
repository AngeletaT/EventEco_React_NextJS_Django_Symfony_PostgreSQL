from rest_framework import serializers
from .models import E_EventCategory

class E_EventCategorySerializer(serializers.ModelSerializer):
     class Meta:
          model = E_EventCategory
          fields = ['idcategory', 'categoryname', 'imageurl', 'createdat', 'updatedat']
