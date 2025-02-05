from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination
from .models import P_Event
from .serializers import P_EventSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class P_EventPagination(PageNumberPagination):
     page_size = 5
     page_size_query_param = 'page_size'
     max_page_size = 100

class P_EventViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar los eventos de Pawnity.

     - **Listar eventos:** `list()`
     - **Listar todos los eventos (custom action):** `list_events()`
     """

     queryset = P_Event.objects.all().order_by('idevent')
     serializer_class = P_EventSerializer
     lookup_field = 'idevent'
     pagination_class = P_EventPagination  # Usamos la paginación configurada

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todos los eventos disponibles en Pawnity con filtros y paginación.",
          responses={200: P_EventSerializer(many=True)},
          manual_parameters=[
               openapi.Parameter('categorySlug', openapi.IN_QUERY, description="Slug de la categoría de los eventos", type=openapi.TYPE_STRING),
               openapi.Parameter('location', openapi.IN_QUERY, description="Ubicación de los eventos", type=openapi.TYPE_STRING),
               openapi.Parameter('order_by_date', openapi.IN_QUERY, description="Ordenar por fecha (asc/desc)", type=openapi.TYPE_STRING),
               openapi.Parameter('page', openapi.IN_QUERY, description="Número de página para la paginación", type=openapi.TYPE_INTEGER),
          ]
     )
     def list_events(self, request):
          """
          Devuelve una lista de eventos registrados en Pawnity, con filtros y paginación.

          **Parámetros de consulta:**
          - **categorySlug**: Slug de la categoría para filtrar.
          - **location**: Filtra por ubicación de los eventos.
          - **order_by_date**: Ordena los eventos por fecha (ascendente o descendente).
          - **page**: Número de página para la paginación (por defecto página 1).

          **Retorna:**
          - 200 OK: Lista de eventos en formato JSON con información de paginación.
          """
          category_slug = request.query_params.get('categorySlug')
          location = request.query_params.get('location')
          order_by_date = request.query_params.get('order_by_date')
          page = request.query_params.get('page', 1)  # Valor por defecto 1

          # Filtramos los eventos
          queryset = self.get_queryset()
          if category_slug:
               queryset = queryset.filter(idcategory__categoryslug=category_slug)  # Cambio aquí

          if location:
               queryset = queryset.filter(location__icontains=location)

          if order_by_date:
               if order_by_date.lower() == 'asc':
                    queryset = queryset.order_by('startdate')
               elif order_by_date.lower() == 'desc':
                    queryset = queryset.order_by('-startdate')

          # Aplicar paginación
          paginator = self.pagination_class()
          result_page = paginator.paginate_queryset(queryset, request)
          serializer = self.get_serializer(result_page, many=True)

          return paginator.get_paginated_response(serializer.data)

