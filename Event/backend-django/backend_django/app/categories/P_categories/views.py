from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import P_EventCategory
from .serializers import P_EventCategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class P_EventCategoryViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar las categorías de eventos de Pawnity.

     - **Listar todas las categorías:** `list()`
     - **Listar todas las categorías (custom action):** `list_all_categories()`
     """

     queryset = P_EventCategory.objects.all().order_by('createdat')
     serializer_class = P_EventCategorySerializer
     lookup_field = 'idcategory'

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todas las categorías de eventos de Pawnity",
          responses={200: P_EventCategorySerializer(many=True)}
     )
     
     def list_all_categories(self, request):
          """
          Devuelve una lista con todas las categorías de eventos disponibles en Pawnity.

          **Retorna:**
          - 200 OK: Lista de categorías
          """
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)
