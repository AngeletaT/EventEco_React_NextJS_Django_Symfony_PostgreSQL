from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import P_Event
from .serializers import P_EventSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class P_EventViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar los eventos de Pawnity.

     - **Listar eventos:** `list()`
     - **Listar todos los eventos (custom action):** `list_all_events()`
     """

     queryset = P_Event.objects.all().order_by('idevent')
     serializer_class = P_EventSerializer
     lookup_field = 'idevent'

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todos los eventos disponibles en Pawnity",
          responses={200: P_EventSerializer(many=True)}
     )
     
     def list_all_events(self, request):
          """
          Devuelve una lista con todos los eventos registrados en Pawnity.

          **Retorna:**
          - 200 OK: Lista de eventos en formato JSON.
          """
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)
