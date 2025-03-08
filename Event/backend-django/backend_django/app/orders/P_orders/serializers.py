from rest_framework import serializers
from django.utils.timezone import now
from .models import P_Order, P_OrderLine, P_TicketUnit
from backend_django.app.tickets.P_tickets.models import P_TicketInfo
from backend_django.app.complements.P_complements.models import P_Complement
from backend_django.app.events.P_events.models import P_Event
from backend_django.app.tickets.P_tickets.serializers import P_TicketInfoSerializer
from backend_django.app.complements.P_complements.serializers import P_ComplementSerializer
from backend_django.app.events.P_events.serializers import P_EventSerializer

# 🎫 SERIALIZER: TicketUnit
class P_TicketUnitSerializer(serializers.ModelSerializer):
     class Meta:
          model = P_TicketUnit
          fields = [
               'idticketunit',
               'idorder',
               'idticketinfo',
               'code',
               'unitprice',
               'complements',
               'nameassistant',
               'dniassistant',
               'status',
               'createdat',
               'updatedat'
          ]
     def update(self, instance, validated_data):
          """
          Actualiza los datos de un TicketUnit (asignación de nombre y DNI del asistente).
          """
          instance.nameassistant = validated_data.get('nameassistant', instance.nameassistant)
          instance.dniassistant = validated_data.get('dniassistant', instance.dniassistant)
          instance.updatedat = now()  # Actualizamos la fecha de modificación
          instance.save()
          return instance

# 🧾 SERIALIZER: OrderLine
class P_OrderLineSerializer(serializers.ModelSerializer):
     class Meta:
          model = P_OrderLine
          fields = [
               'idorderline',
               'idorder',
               'itemtype',
               'itemid',
               'quantity',
               'discount',
               'subtotal',
               'status',
               'createdat',
               'updatedat'
          ]

# 📦 SERIALIZER: Order con OrderLines + TicketUnits
class P_OrderDetailSerializer(serializers.ModelSerializer):
     orderlines = serializers.SerializerMethodField()
     ticketunits = serializers.SerializerMethodField()

     class Meta:
          model = P_Order
          fields = [
               'idorder',
               'idclient',
               'idevent',
               'subtotaltickets',
               'subtotalcomplements',
               'subtotalcommissions',
               'totalprice',
               'payment',
               'paymentreference',
               'paymentstatus',
               'status',
               'datepurchase',
               'createdat',
               'updatedat',
               'orderlines',   # 🔗 Relación con OrderLines
               'ticketunits'   # 🔗 Relación con TicketUnits
          ]

     def get_orderlines(self, obj):
          """Obtiene las líneas de pedido relacionadas con la orden."""
          orderlines = P_OrderLine.objects.filter(idorder=obj.idorder)
          return P_OrderLineSerializer(orderlines, many=True).data

     def get_ticketunits(self, obj):
          """Obtiene las unidades de tickets relacionadas con la orden."""
          tickets = P_TicketUnit.objects.filter(idorder=obj.idorder)
          return P_TicketUnitSerializer(tickets, many=True).data


# 🎟️ SERIALIZER: TicketUnit con TicketInfo y Complements
class P_TicketUnitFullSerializer(serializers.ModelSerializer):
     ticketinfo = serializers.SerializerMethodField()
     complements = serializers.SerializerMethodField()

     class Meta:
          model = P_TicketUnit
          fields = [
               "idticketunit",
               "idorder",
               "idticketinfo",
               "ticketinfo",  # 🔗 Info del tipo de ticket
               "code",
               "unitprice",
               "complements",  # 🔗 Info detallada de cada complemento
               "nameassistant",
               "dniassistant",
               "status",
               "createdat",
               "updatedat"
          ]

     def get_ticketinfo(self, obj):
          """Obtiene la información del tipo de ticket asociado al TicketUnit."""
          ticket_info = P_TicketInfo.objects.filter(idticketinfo=obj.idticketinfo).first()
          return P_TicketInfoSerializer(ticket_info).data if ticket_info else None

     def get_complements(self, obj):
          """Obtiene la información detallada de cada complemento dentro del TicketUnit."""
          complements = P_Complement.objects.filter(idcomplement__in=obj.complements)
          return P_ComplementSerializer(complements, many=True).data

# 📦 SERIALIZER: Client Dashboard con Active & Old Orders
class P_ClientDashboardSerializer(serializers.Serializer):
     active_orders = serializers.SerializerMethodField()
     old_orders = serializers.SerializerMethodField()

     def get_active_orders(self, data):
          """Obtiene los pedidos activos del cliente (eventos que aún no han ocurrido o son hoy)."""
          orders = data.get("orders", [])  # Lista de pedidos
          return [self.serialize_order(order) for order in orders if self.is_active(order)]

     def get_old_orders(self, data):
          """Obtiene los pedidos pasados del cliente (eventos que ya ocurrieron)."""
          orders = data.get("orders", [])  # Lista de pedidos
          return [self.serialize_order(order) for order in orders if not self.is_active(order)]

     def is_active(self, order):
          """Determina si un pedido está activo según la fecha de inicio del evento."""
          event = P_Event.objects.filter(idevent=order.idevent).first()
          return event and event.startdate >= now().date()  # ✅ Comparación con la fecha actual

     def serialize_order(self, order):
          """Serializa un pedido completo con toda su información anidada."""
          event = P_Event.objects.filter(idevent=order.idevent).first()
          orderlines = P_OrderLine.objects.filter(idorder=order.idorder)
          ticketunits = P_TicketUnit.objects.filter(idorder=order.idorder)

          return {
               "idorder": order.idorder,
               "idclient": order.idclient,
               "idevent": order.idevent,
               "event": P_EventSerializer(event).data if event else None,  # 🔗 Info del evento
               "subtotaltickets": order.subtotaltickets,
               "subtotalcomplements": order.subtotalcomplements,
               "subtotalcommissions": order.subtotalcommissions,
               "totalprice": order.totalprice,
               "paymentstatus": order.paymentstatus,
               "status": order.status,
               "datepurchase": order.datepurchase,
               "createdat": order.createdat,
               "updatedat": order.updatedat,
               "orderlines": P_OrderLineSerializer(orderlines, many=True).data,  # 🔗 Líneas del pedido
               "ticketunits": P_TicketUnitFullSerializer(ticketunits, many=True).data  # 🔗 Tickets con info completa
          }
