from rest_framework import mixins, viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProfileOrganizerSerializer
from drf_yasg.utils import swagger_auto_schema

class ProfileOrganizerViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
     """
     API ViewSet para gestionar los organizadores.

     - **Listar organizadores:** `list_all_organizers()`
     """
     serializer_class = ProfileOrganizerSerializer

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todos los organizadores sin paginación.",
          responses={200: ProfileOrganizerSerializer(many=True)}
     )
     def list_all_organizers(self, request):
          """
          Devuelve una lista de todos los organizadores sin paginación.

          **Retorna:**
          - 200 OK: Lista de organizadores en formato JSON.
          - 404 Not Found: Si no existen organizadores registrados.
          """
          try:
               organizers = ProfileOrganizerSerializer.get_all_organizers()
               serializer = self.get_serializer(organizers, many=True)
               return Response(serializer.data, status=status.HTTP_200_OK)
          except serializers.ValidationError as e:
               return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
