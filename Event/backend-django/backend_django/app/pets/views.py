from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import PageNumberPagination
from .models import Pet
from .serializers import PetSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class PetPagination(PageNumberPagination):
     """
     Configuración de paginación para la lista de mascotas.
     """
     page_size = 5
     page_size_query_param = 'page_size'
     max_page_size = 100

class PetViewSet(ListModelMixin, GenericViewSet):
     """
     API ViewSet para gestionar las mascotas.

     - **Listar mascotas:** `list()`
     - **Listar todas las mascotas con filtros (acción personalizada):** `list_pets()`
     """

     queryset = Pet.objects.all().order_by('idpet')
     serializer_class = PetSerializer
     lookup_field = 'idpet'
     pagination_class = PetPagination  # Usamos la paginación configurada

     @swagger_auto_schema(
          operation_description="Obtiene la lista de todas las mascotas disponibles con filtros y paginación.",
          responses={200: PetSerializer(many=True)},
          manual_parameters=[
               openapi.Parameter('gender', openapi.IN_QUERY, description="Filtra las mascotas por género ('male' o 'female')", type=openapi.TYPE_STRING),
               openapi.Parameter('idorg', openapi.IN_QUERY, description="Filtra las mascotas por ID de la organización", type=openapi.TYPE_INTEGER),
               openapi.Parameter('species', openapi.IN_QUERY, description="Filtra las mascotas por especie ('dog' o 'cat')", type=openapi.TYPE_STRING),
               openapi.Parameter('page', openapi.IN_QUERY, description="Número de página para la paginación", type=openapi.TYPE_INTEGER),
          ]
     )
     def list_pets(self, request):
          """
          Devuelve una lista de mascotas, con filtros y paginación.

          **Parámetros de consulta:**
          - **gender**: Filtra por género ('male' o 'female').
          - **idorg**: Filtra por el ID de la organización.
          - **species**: Filtra por especie ('dog' o 'cat').
          - **page**: Número de página para la paginación (por defecto página 1).

          **Retorna:**
          - 200 OK: Lista de mascotas en formato JSON con información de paginación.
          """
          gender = request.query_params.get('gender')
          idorg = request.query_params.get('idorg')
          species = request.query_params.get('species')
          page = request.query_params.get('page', 1)  # Valor por defecto 1

          # Filtramos las mascotas
          queryset = self.get_queryset()
          if gender:
               queryset = queryset.filter(gender=gender)

          if idorg:
               queryset = queryset.filter(idorg=idorg)

          if species:
               queryset = queryset.filter(species=species)

          # Aplicar paginación
          paginator = self.pagination_class()
          result_page = paginator.paginate_queryset(queryset, request)
          serializer = self.get_serializer(result_page, many=True)

          return paginator.get_paginated_response(serializer.data)
