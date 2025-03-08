from rest_framework import serializers
from django.utils.timezone import now
from .models import E_Order, E_OrderLine, E_TicketUnit
from backend_django.app.tickets.E_tickets.models import E_TicketInfo
from backend_django.app.complements.E_complements.models import E_Complement
from backend_django.app.events.E_events.models import E_Event
from backend_django.app.tickets.E_tickets.serializers import E_TicketInfoSerializer
from backend_django.app.complements.E_complements.serializers import E_ComplementSerializer
from backend_django.app.events.E_events.serializers import E_EventSerializer

# 🎫 SERIALIZER: TicketUnit
class E_TicketUnitSerializer(serializers.ModelSerializer):
     class Meta:
          model = E_TicketUnit
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
class E_OrderLineSerializer(serializers.ModelSerializer):
     class Meta:
          model = E_OrderLine
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
class E_OrderDetailSerializer(serializers.ModelSerializer):
     orderlines = serializers.SerializerMethodField()
     ticketunits = serializers.SerializerMethodField()

     class Meta:
          model = E_Order
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
          orderlines = E_OrderLine.objects.filter(idorder=obj.idorder)
          return E_OrderLineSerializer(orderlines, many=True).data

     def get_ticketunits(self, obj):
          """Obtiene las unidades de tickets relacionadas con la orden."""
          tickets = E_TicketUnit.objects.filter(idorder=obj.idorder)
          return E_TicketUnitSerializer(tickets, many=True).data


# 🎟️ SERIALIZER: TicketUnit con TicketInfo y Complements
class E_TicketUnitFullSerializer(serializers.ModelSerializer):
     ticketinfo = serializers.SerializerMethodField()
     complements = serializers.SerializerMethodField()

     class Meta:
          model = E_TicketUnit
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
          ticket_info = E_TicketInfo.objects.filter(idticketinfo=obj.idticketinfo).first()
          return E_TicketInfoSerializer(ticket_info).data if ticket_info else None

     def get_complements(self, obj):
          """Obtiene la información detallada de cada complemento dentro del TicketUnit."""
          complements = E_Complement.objects.filter(idcomplement__in=obj.complements)
          return E_ComplementSerializer(complements, many=True).data

# 📦 SERIALIZER: Client Dashboard con Active & Old Orders
class E_ClientDashboardSerializer(serializers.Serializer):
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
          event = E_Event.objects.filter(idevent=order.idevent).first()
          return event and event.startdate >= now().date()  # ✅ Comparación con la fecha actual

     def serialize_order(self, order):
          """Serializa un pedido completo con toda su información anidada."""
          event = E_Event.objects.filter(idevent=order.idevent).first()
          orderlines = E_OrderLine.objects.filter(idorder=order.idorder)
          ticketunits = E_TicketUnit.objects.filter(idorder=order.idorder)

          return {
               "idorder": order.idorder,
               "idclient": order.idclient,
               "idevent": order.idevent,
               "event": E_EventSerializer(event).data if event else None,  # 🔗 Info del evento
               "subtotaltickets": order.subtotaltickets,
               "subtotalcomplements": order.subtotalcomplements,
               "subtotalcommissions": order.subtotalcommissions,
               "totalprice": order.totalprice,
               "paymentstatus": order.paymentstatus,
               "status": order.status,
               "datepurchase": order.datepurchase,
               "createdat": order.createdat,
               "updatedat": order.updatedat,
               "orderlines": E_OrderLineSerializer(orderlines, many=True).data,  # 🔗 Líneas del pedido
               "ticketunits": E_TicketUnitFullSerializer(ticketunits, many=True).data  # 🔗 Tickets con info completa
          }
