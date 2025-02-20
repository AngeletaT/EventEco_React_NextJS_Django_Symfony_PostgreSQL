from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from django.db import transaction
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from .serializers import E_OrderDetailSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import json
import uuid
from .models import E_Order, E_OrderLine, E_TicketUnit
from backend_django.app.tickets.E_tickets.models import E_TicketInfo
from backend_django.app.complements.E_complements.models import E_Complement

class E_OrderDetailView(APIView):
     """
     🔍 Consulta los detalles completos de un pedido por su ID.
     Incluye: Order, OrderLines y TicketUnits.
     """

     @swagger_auto_schema(
          operation_description="Obtiene los detalles completos de una orden (Order + OrderLines + TicketUnits).",
          manual_parameters=[
               openapi.Parameter('idorder', openapi.IN_PATH, description="ID de la orden", type=openapi.TYPE_INTEGER)
          ],
          responses={200: E_OrderDetailSerializer()}
     )
     def get(self, request, idorder):
          order = get_object_or_404(E_Order, idorder=idorder)
          serializer = E_OrderDetailSerializer(order)
          return Response(serializer.data, status=status.HTTP_200_OK)

class E_OrderCreateView(APIView):
     """
     🛒 Endpoint para crear un pedido completo:
     - Crea la orden, líneas de pedido y unidades de ticket.
     - Estado inicial del pedido: "pending".
     """
     permission_classes = [permissions.IsAuthenticated]

     @swagger_auto_schema(
          operation_description="Crea un pedido con tickets y complementos.",
          request_body=openapi.Schema(
               type=openapi.TYPE_OBJECT,
               properties={
                    "idevent": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID del evento"),
                    "tickets": openapi.Schema(
                         type=openapi.TYPE_ARRAY,
                         items=openapi.Schema(
                         type=openapi.TYPE_OBJECT,
                         properties={
                              "idticketinfo": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID del tipo de ticket"),
                              "quantity": openapi.Schema(type=openapi.TYPE_INTEGER, description="Cantidad de tickets"),
                              "entries": openapi.Schema(
                                   type=openapi.TYPE_ARRAY,
                                   items=openapi.Schema(
                                        type=openapi.TYPE_OBJECT,
                                        properties={
                                             "complements": openapi.Schema(
                                             type=openapi.TYPE_ARRAY,
                                             items=openapi.Schema(type=openapi.TYPE_INTEGER),
                                             description="IDs de complementos asignados"
                                             )
                                        }
                                   )
                              )
                         }
                         )
                    )
               },
               required=["idevent", "tickets"]
          ),
          responses={201: E_OrderDetailSerializer(), 400: "Datos inválidos", 401: "No autorizado"}
     )
     @transaction.atomic
     def post(self, request):
          # 🔑 Paso 1: Decodificar token y verificar role
          auth_header = request.headers.get("Authorization", "")
          if not auth_header.startswith("Bearer "):
               return Response({"error": "Token no proporcionado o formato incorrecto"}, status=401)

          try:
               access_token = auth_header.split("Bearer ")[-1]
               decoded_token = AccessToken(access_token)
               role = decoded_token.get("role")
               idclient = decoded_token.get("idclient")
          except TokenError:
               return Response({"error": "Token inválido o expirado"}, status=401)

          if role != "client":
               return Response({"error": "Solo los clientes pueden realizar pedidos"}, status=403)

          # 📥 Paso 2: Validación del JSON de entrada
          data = request.data
          idevent = data.get("idevent")
          tickets = data.get("tickets")

          if not idevent or not tickets:
               return Response({"error": "Campos 'idevent' y 'tickets' son obligatorios"}, status=400)

          if not isinstance(tickets, list) or not tickets:
               return Response({"error": "'tickets' debe ser una lista no vacía"}, status=400)

          subtotaltickets = 0.00
          subtotalcomplements = 0.00

          # 📝 Paso 3: Crear la orden con estado "pending"
          order = E_Order.objects.create(
               idclient=idclient,
               idevent=idevent,
               subtotaltickets=0.00,  # Se actualizarán después
               subtotalcomplements=0.00,
               totalprice=0.00,
               paymentstatus="pending",
               status="pending",
               createdat=now(),
               updatedat=now()
          )

          # 🧾 Paso 4: Procesar tickets y complementos
          for ticket in tickets:
               idticketinfo = ticket.get("idticketinfo")
               quantity = ticket.get("quantity")
               entries = ticket.get("entries")

               if not idticketinfo or not quantity or not entries:
                    return Response({"error": "Cada ticket debe tener 'idticketinfo', 'quantity' y 'entries'"}, status=400)

               # Obtener info del ticket
               ticket_info = E_TicketInfo.objects.filter(idticketinfo=idticketinfo).first()
               if not ticket_info:
                    return Response({"error": f"Ticket info con ID {idticketinfo} no encontrado."}, status=404)

               unitprice = float(ticket_info.price)
               ticketsubtotal = unitprice * quantity
               subtotaltickets += ticketsubtotal

               # 🧾 Crear línea de pedido para los tickets
               E_OrderLine.objects.create(
                    idorder=order.idorder,
                    itemtype='ticket',
                    itemid=idticketinfo,
                    quantity=quantity,
                    subtotal=ticketsubtotal,
                    createdat=now(),
                    updatedat=now()
               )

               # 🎫 Paso 5: Crear ticket units
               for entry in entries:
                    complements = entry.get("complements", [])
                    if isinstance(complements, str):
                         complements = json.loads(complements)  # Convierte string como "[5,7]" en lista [5,7]

                    complementsubtotal = 0.00

                    # Calcular subtotal de complementos
                    for complement_id in complements:
                         complement = E_Complement.objects.filter(idcomplement=complement_id).first()
                         if complement:
                              complementsubtotal += float(complement.price)

                              # Crear línea de pedido para cada complemento
                              E_OrderLine.objects.create(
                                   idorder=order.idorder,
                                   itemtype='complement',
                                   itemid=complement_id,
                                   quantity=1,
                                   subtotal=float(complement.price),
                                   createdat=now(),
                                   updatedat=now()
                         )

                    subtotalcomplements += complementsubtotal

                    # 🎟️ Crear unidad de ticket
                    E_TicketUnit.objects.create(
                         idorder=order.idorder,
                         idticketinfo=idticketinfo,
                         code=str(uuid.uuid4()).upper(),  # Código único
                         unitprice=unitprice,
                         complements=complements, 
                         createdat=now(),
                         updatedat=now()
                    )

          # 💵 Paso 6: Actualizar subtotales y total en la orden
          totalprice = subtotaltickets + subtotalcomplements
          order.subtotaltickets = round(subtotaltickets, 2)
          order.subtotalcomplements = round(subtotalcomplements, 2)
          order.totalprice = round(totalprice, 2)
          order.updatedat = now()
          order.save()

          # 🎉 Paso 7: Respuesta con la orden creada
          serializer = E_OrderDetailSerializer(order)
          return Response(serializer.data, status=status.HTTP_201_CREATED)