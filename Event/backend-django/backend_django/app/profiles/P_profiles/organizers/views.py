from rest_framework import mixins, viewsets
from rest_framework.response import Response
from .models import ProfileOrganizer
from .serializers import ProfileOrganizerSerializer
from drf_yasg.utils import swagger_auto_schema

class ProfileOrganizerViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
     """
     API ViewSet para gestionar los organizadores.

     - **Listar organizadores:** `list_all_organizers()`
     """
     queryset = ProfileOrganizer.objects.all().order_by('idprofileorg')
     serializer_class = ProfileOrganizerSerializer
     lookup_field = 'idprofileorg'

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todos los organizadores sin paginación.",
          responses={200: ProfileOrganizerSerializer(many=True)}
     )
     def list_all_organizers(self, request):
          """
          Devuelve una lista de todos los organizadores sin paginación.

          **Retorna:**
          - 200 OK: Lista de organizadores en formato JSON.
          """
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)