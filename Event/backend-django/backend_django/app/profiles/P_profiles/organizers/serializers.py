from rest_framework import serializers
from .models import ProfileOrganizer

class ProfileOrganizerSerializer(serializers.ModelSerializer):
     """
     Serializador para el modelo ProfileOrganizer.
     Contiene la lógica para recuperar todos los organizadores de la base de datos.
     """
     
     @staticmethod
     def get_all_organizers():
          """
          Obtiene todos los organizadores ordenados por 'idprofileorg'.
          Lanza una excepción si no hay datos.
          """
          organizers = ProfileOrganizer.objects.all().order_by('idprofileorg')
          if not organizers.exists():
               raise serializers.ValidationError({"error": "No hay organizadores registrados."})
          return organizers

     class Meta:
          model = ProfileOrganizer
          fields = '__all__'
