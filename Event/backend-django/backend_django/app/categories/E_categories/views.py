from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import E_EventCategory
from .serializers import E_EventCategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class E_EventCategoryViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar las categorías de eventos de EventEco.

     - **Listar todas las categorías:** `list()`
     - **Listar todas las categorías (custom action):** `list_all_categories()`
     """

     queryset = E_EventCategory.objects.all().order_by('idcategory')
     serializer_class = E_EventCategorySerializer
     lookup_field = 'idcategory'

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todas las categorías de eventos",
          responses={200: E_EventCategorySerializer(many=True)}
     )
     
     def list_all_categories(self, request):
          """
          Devuelve una lista con todas las categorías de eventos disponibles.

          **Retorna:**
          - 200 OK: Lista de categorías
          """
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)
