from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import E_Event
from .serializers import E_EventSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class E_EventViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar los eventos de EventEco.

     - **Listar eventos:** `list()`
     - **Listar todos los eventos (custom action):** `list_all_events()`
     """

     queryset = E_Event.objects.all().order_by('idevent')
     serializer_class = E_EventSerializer
     lookup_field = 'idevent'

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todos los eventos disponibles en EventEco",
          responses={200: E_EventSerializer(many=True)}
     )
     
     def list_all_events(self, request):
          """
          Devuelve una lista con todos los eventos registrados en EventEco.

          **Retorna:**
          - 200 OK: Lista de eventos en formato JSON.
          """
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)
