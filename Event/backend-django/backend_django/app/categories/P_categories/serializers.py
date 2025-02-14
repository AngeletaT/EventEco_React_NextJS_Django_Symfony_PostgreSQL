from rest_framework import serializers
from .models import P_EventCategory

class P_EventCategorySerializer(serializers.ModelSerializer):
     class Meta:
          model = P_EventCategory
          fields = ['idcategory', 'categoryname', 'imageurl', 'createdat', 'categoryslug', 'updatedat']

     @staticmethod
     def get_all_categories():
          """
          Obtiene todas las categorías de eventos.
          Si la tabla está vacía, lanza una excepción personalizada.
          """
          try:
               categories = P_EventCategory.objects.all().order_by('idcategory')
               if not categories.exists():
                    raise serializers.ValidationError({"error": "No se encontraron categorías de eventos."})
               return categories
          except Exception as e:
               raise serializers.ValidationError({"error": f"Error al obtener categorías: {str(e)}"})
