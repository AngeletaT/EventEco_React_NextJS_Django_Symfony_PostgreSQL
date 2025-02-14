from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .serializers import P_EventCategorySerializer
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

class P_EventCategoryViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar las categorías de eventos de Pawnity.
     
     - **Listar todas las categorías:** `list()`
     """

     serializer_class = P_EventCategorySerializer
     lookup_field = 'idcategory'

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todas las categorías de eventos",
          responses={200: P_EventCategorySerializer(many=True)}
     )
     def list(self, request, *args, **kwargs):
          """
          Devuelve una lista con todas las categorías de eventos disponibles.

          **Retorna:**
          - 200 OK: Lista de categorías
          - 400 Bad Request: Si ocurre un error o no hay datos
          """
          try:
               categories = P_EventCategorySerializer.get_all_categories()
               serializer = self.get_serializer(categories, many=True)
               return Response(serializer.data)
          except serializers.ValidationError as e:
               return Response(e.detail, status=400)
