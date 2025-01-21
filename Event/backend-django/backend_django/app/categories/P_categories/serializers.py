from rest_framework import serializers
from .models import P_EventCategory

class P_EventCategorySerializer(serializers.ModelSerializer):
     class Meta:
          model = P_EventCategory
          fields = ['idcategory', 'categoryname', 'imageurl', 'createdat', 'updatedat']
