from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework import status, permissions
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Pet, Adoption, Sponsorship
from .serializers import PetSerializer, PetFilterSerializer, AdoptionCreationSerializer, SponsorshipCreationSerializer, GetMySponsorshipsSerializer, GetMyAdoptionsSerializer
from math import ceil
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken, TokenError


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

class AdoptionCreateView(APIView):
     """
     🐾 Crea, reactiva o desactiva una solicitud de adopción.
     """

     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          operation_description="Crea, reactiva o desactiva una solicitud de adopción.",
          request_body=openapi.Schema(
               type=openapi.TYPE_OBJECT,
               properties={
                    "idorg": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID de la organización."),
                    "idpet": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID de la mascota a adoptar.")
               },
               required=["idorg", "idpet"]
          ),
          responses={
               201: "Solicitud de adopción creada, reactivada o desactivada.",
               401: "No autorizado."
          }
     )
     def post(self, request):
          """
          Procesa una solicitud de adopción (crear, reactivar o hacer toggle en `isactive`).
          """
          # 🔑 Extraer el `idclient` del token JWT
          auth_header = request.headers.get("Authorization", "")
          if not auth_header.startswith("Bearer "):
               return Response({"message": "Token no proporcionado o formato incorrecto."}, status=401)

          try:
               access_token = auth_header.split("Bearer ")[-1]
               decoded_token = AccessToken(access_token)
               idclient = decoded_token.get("idclient")
          except TokenError:
               return Response({"message": "Token inválido o expirado."}, status=401)

          # 📥 Validar los datos de entrada
          serializer = AdoptionCreationSerializer(data=request.data, context={"idclient": idclient})

          if serializer.is_valid():
               adoption, action = serializer.save()

               if action == "created":
                    message = "Solicitud de adopción creada correctamente."
               elif action == "reactivated":
                    message = "Solicitud de adopción reactivada."
               else:
                    message = "Solicitud de adopción desactivada."

               return Response({"message": message, "adoption_id": adoption.idadoption}, status=201)

          return Response({"message": serializer.errors["message"][0]}, status=400)

class SponsorshipCreateView(APIView):
     """
     💰 Crea, reactiva o desactiva una suscripción/apadrinamiento.
     """

     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          operation_description="Crea, reactiva o desactiva una suscripción/apadrinamiento.",
          request_body=openapi.Schema(
               type=openapi.TYPE_OBJECT,
               properties={
                    "idorg": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID de la organización."),
                    "idpet": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID de la mascota asociada a la suscripción.")
               },
               required=["idorg", "idpet"]
          ),
          responses={
               201: "Suscripción creada, reactivada o desactivada.",
               401: "No autorizado."
          }
     )
     def post(self, request):
          """
          Procesa una solicitud de suscripción (crear, reactivar o hacer toggle en `isactive`).
          """
          # 🔑 Extraer el `idclient` del token JWT
          auth_header = request.headers.get("Authorization", "")
          if not auth_header.startswith("Bearer "):
               return Response({"message": "Token no proporcionado o formato incorrecto."}, status=401)

          try:
               access_token = auth_header.split("Bearer ")[-1]
               decoded_token = AccessToken(access_token)
               idclient = decoded_token.get("idclient")
          except TokenError:
               return Response({"message": "Token inválido o expirado."}, status=401)

          # 📥 Validar los datos de entrada
          serializer = SponsorshipCreationSerializer(data=request.data, context={"idclient": idclient})

          if serializer.is_valid():
               sponsorship, action = serializer.save()

               if action == "created":
                    message = "Suscripción creada correctamente."
               elif action == "reactivated":
                    message = "Suscripción reactivada."
               else:
                    message = "Suscripción desactivada."

               return Response({"message": message, "sponsorship_id": sponsorship.idsponsorship}, status=201)

          return Response({"message": serializer.errors["message"][0]}, status=400)
     
class GetMySponsorshipsView(APIView):
     """
     📋 Devuelve todas las suscripciones activas del cliente autenticado.
     """

     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          operation_description="Obtiene todas las suscripciones activas del cliente autenticado.",
          responses={200: "Lista de suscripciones del cliente."}
     )
     def get(self, request):
          """
          Obtiene todas las suscripciones activas del cliente a partir del token JWT.
          """
          # 🔑 Extraer el `idclient` del token JWT
          auth_header = request.headers.get("Authorization", "")
          if not auth_header.startswith("Bearer "):
               return Response({"message": "Token no proporcionado o formato incorrecto."}, status=401)

          try:
               access_token = auth_header.split("Bearer ")[-1]
               decoded_token = AccessToken(access_token)
               idclient = decoded_token.get("idclient")
          except TokenError:
               return Response({"message": "Token inválido o expirado."}, status=401)

          # 📥 Filtrar suscripciones del cliente
          sponsorships = Sponsorship.objects.filter(idclient=idclient)

          if not sponsorships.exists():
               return Response({"message": "No tienes suscripciones activas."}, status=200)

          # 📦 Serializar y devolver la respuesta
          serializer = GetMySponsorshipsSerializer(sponsorships, many=True)
          return Response(serializer.data, status=200)

class GetMyAdoptionsView(APIView):
     """
     📋 Devuelve todas las adopciones activas del cliente autenticado.
     """

     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          operation_description="Obtiene todas las adopciones activas del cliente autenticado.",
          responses={200: "Lista de adopciones activas del cliente."}
     )
     def get(self, request):
          """
          Obtiene todas las adopciones activas del cliente a partir del token JWT.
          """
          # 🔑 Extraer el `idclient` del token JWT
          auth_header = request.headers.get("Authorization", "")
          if not auth_header.startswith("Bearer "):
               return Response({"message": "Token no proporcionado o formato incorrecto."}, status=401)

          try:
               access_token = auth_header.split("Bearer ")[-1]
               decoded_token = AccessToken(access_token)
               idclient = decoded_token.get("idclient")
          except TokenError:
               return Response({"message": "Token inválido o expirado."}, status=401)

          # 📥 Filtrar adopciones activas del cliente
          adoptions = Adoption.objects.filter(idclient=idclient)

          if not adoptions.exists():
               return Response({"message": "No tienes adopciones activas."}, status=200)

          # 📦 Serializar y devolver la respuesta
          serializer = GetMyAdoptionsSerializer(adoptions, many=True)
          return Response(serializer.data, status=200)

