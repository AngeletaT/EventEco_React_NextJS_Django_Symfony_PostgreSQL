from rest_framework import serializers
from .models import P_Complement

class P_ComplementSerializer(serializers.ModelSerializer):
     """
     Serializador para representar los complementos asociados a los eventos.
     """

     class Meta:
          model = P_Complement
          fields = [
               "idcomplement",
               "name",
               "description",
               "price",
               "imageurl",
               "eventslug",
               "isactive",
               "createdat",
               "updatedat",
          ]
          read_only_fields = ["idcomplement", "createdat", "updatedat"]
