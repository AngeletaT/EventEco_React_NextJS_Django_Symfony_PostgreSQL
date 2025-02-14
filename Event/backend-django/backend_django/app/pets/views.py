from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import Pet
from .serializers import PetSerializer, PetFilterSerializer
from math import ceil


class PetPagination(PageNumberPagination):
     """
     Configuración de paginación para la lista de mascotas.
     """
     page_size = 5
     page_size_query_param = 'page_size'
     max_page_size = 100

     def get_paginated_response(self, data):
          """
          Personaliza la respuesta de la paginación para mostrar la información de páginas.
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


class PetViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar las mascotas.

     - **Listar mascotas:** `list()`
     - **Listar todas las mascotas con filtros (acción personalizada):** `list_pets()`
     """

     queryset = Pet.objects.all().order_by('idpet')
     serializer_class = PetSerializer
     lookup_field = 'idpet'
     pagination_class = PetPagination 

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todas las mascotas disponibles con filtros y paginación.",
          responses={200: PetSerializer(many=True)},
          manual_parameters=[
               openapi.Parameter('gender', openapi.IN_QUERY, description="Filtra las mascotas por género ('macho' o 'hembra')", type=openapi.TYPE_STRING),
               openapi.Parameter('idorg', openapi.IN_QUERY, description="Filtra las mascotas por ID de la organización", type=openapi.TYPE_INTEGER),
               openapi.Parameter('species', openapi.IN_QUERY, description="Filtra las mascotas por especie ('perro' o 'gato')", type=openapi.TYPE_STRING),
               openapi.Parameter('page', openapi.IN_QUERY, description="Número de página para la paginación", type=openapi.TYPE_INTEGER),
          ]
     )
     @action(detail=False, methods=['get'], url_path='list-pets')
     def list_pets(self, request):
          """
          Devuelve una lista de mascotas con filtros y paginación.

          **Parámetros de consulta:**
          - **gender**: Filtra por género ('macho' o 'hembra').
          - **idorg**: Filtra por el ID de la organización.
          - **species**: Filtra por especie ('perro' o 'gato').
          - **page**: Número de página para la paginación (por defecto página 1).

          **Retorna:**
          - 200 OK: Lista de mascotas en formato JSON con información de paginación.
          """
          serializer = PetFilterSerializer(data=request.query_params)

          if not serializer.is_valid():
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

          queryset = serializer.filter_pets(self.get_queryset())

          # Aplicar paginación
          paginator = self.pagination_class()
          result_page = paginator.paginate_queryset(queryset, request)
          serializer = self.get_serializer(result_page, many=True)

          return paginator.get_paginated_response(serializer.data)
