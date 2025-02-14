from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination
from .models import P_Event
from .serializers import (
     P_EventSerializer, 
     P_EventDetailSerializer,
     P_EventFilterSerializer,
     P_EventDetailRetrievalSerializer
)
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from math import ceil


class P_EventPagination(PageNumberPagination):
     """
     Configuración de paginación para la lista de eventos.
     """
     page_size = 5
     page_size_query_param = 'page_size'
     max_page_size = 100

     def get_paginated_response(self, data):
          """
          Personaliza la respuesta de la paginación.
          """
          total_items = self.page.paginator.count
          total_pages = ceil(total_items / self.page_size)
          current_page = self.page.number
          next_page = self.page.next_page_number() if self.page.has_next() else None
          previous_page = self.page.previous_page_number() if self.page.has_previous() else None

          return Response({
               "count": total_items,
               "total_pages": total_pages,
               "current_page": current_page,
               "previous": previous_page,
               "next": next_page,
               "results": data
          })


class P_EventViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar los eventos de PaWnity.
     """

     queryset = P_Event.objects.all().order_by('idevent')
     serializer_class = P_EventSerializer
     lookup_field = 'idevent'
     pagination_class = P_EventPagination

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todos los eventos disponibles en Pawnity con filtros y paginación.",
          query_serializer=P_EventFilterSerializer,
          responses={200: P_EventSerializer(many=True)}
     )
     def list_events(self, request):
          """
          Devuelve una lista de eventos registrados en Eventeco, con filtros y paginación.
          """
          filter_serializer = P_EventFilterSerializer(data=request.query_params)

          if not filter_serializer.is_valid():
               return Response(filter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

          queryset = filter_serializer.filter_events(self.get_queryset())

          paginator = self.pagination_class()
          result_page = paginator.paginate_queryset(queryset, request)
          serializer = self.get_serializer(result_page, many=True)

          return paginator.get_paginated_response(serializer.data)


class P_EventDetailViewSet(GenericViewSet):
     """
     API ViewSet para obtener los detalles de un evento en Pawnity.
     """
     serializer_class = P_EventDetailSerializer
     lookup_field = 'eventslug'

     @swagger_auto_schema(
          operation_description="Obtiene los detalles de un evento específico en Pawnity basado en su slug.",
          responses={200: P_EventDetailSerializer()}
     )
     def retrieve_event_details(self, request, eventslug=None):
          """
          Devuelve los detalles de un evento específico basado en su slug.

          **Parámetros:**
          - **eventslug**: Identificador único del evento.

          **Retorna:**
          - 200 OK: Detalles del evento en formato JSON.
          - 404 Not Found: Si el evento no existe.
          """
          if not eventslug:
               return Response({"error": "El campo 'eventslug' es obligatorio."}, status=status.HTTP_400_BAD_REQUEST)

          event = P_Event.objects.filter(eventslug=eventslug).first()

          if not event:
               return Response({"error": "Evento no encontrado."}, status=status.HTTP_404_NOT_FOUND)

          serializer = self.get_serializer(event)
          return Response(serializer.data, status=status.HTTP_200_OK)

