from rest_framework import serializers
from .models import P_Event
from backend_django.app.categories.P_categories.serializers import P_EventCategorySerializer
from backend_django.app.subEvents.P_subEvents.serializers import P_SubEventSerializer
from backend_django.app.complements.P_complements.serializers import P_ComplementSerializer
from backend_django.app.tickets.P_tickets.serializers import P_TicketInfoSerializer
from backend_django.app.complements.P_complements.models import P_Complement
from backend_django.app.tickets.P_tickets.models import P_TicketInfo


class P_EventSerializer(serializers.ModelSerializer):
     category = P_EventCategorySerializer(source='idcategory', read_only=True)

     class Meta:
          model = P_Event
          fields = [
               'idevent',
               'name',
               'eventslug',
               'startdate',
               'enddate',
               'location',
               'description',
               'status',
               'urlimage',
               'urlposter',
               'idorg',
               'idcategory',
               'category',
               'createdat',
               'updatedat',
          ]


class P_EventDetailSerializer(serializers.ModelSerializer):
     category = P_EventCategorySerializer(source='idcategory', read_only=True)
     subevents = P_SubEventSerializer(many=True, read_only=True)
     complements = serializers.SerializerMethodField()
     tickets = serializers.SerializerMethodField()

     class Meta:
          model = P_Event
          fields = [
               'idevent',
               'name',
               'eventslug',
               'startdate',
               'enddate',
               'location',
               'position',
               'description',
               'status',
               'urlimage',
               'urlposter',
               'idorg',
               'idcategory',
               'category',
               'subevents',
               'complements',
               'tickets', 
               'createdat',
               'updatedat',
          ]

     def get_complements(self, obj):
          """
          Devuelve la lista de complementos asociados al evento mediante eventslug.
          """
          complements = P_Complement.objects.filter(eventslug=obj.eventslug, isactive=True)
          return P_ComplementSerializer(complements, many=True).data

     def get_tickets(self, obj):
          """
          Devuelve la lista de tickets asociados al evento mediante eventslug.
          """
          tickets = P_TicketInfo.objects.filter(eventslug=obj.eventslug, isactive=True)
          return P_TicketInfoSerializer(tickets, many=True).data


class P_EventFilterSerializer(serializers.Serializer):
     """
     Serializador para manejar los filtros de búsqueda en eventos.
     """
     categorySlug = serializers.CharField(required=False)
     location = serializers.CharField(required=False)
     order_by_date = serializers.ChoiceField(choices=['asc', 'desc'], required=False)
     
     def filter_events(self, queryset):
          """
          Aplica los filtros a la consulta de eventos.
          """
          category_slug = self.validated_data.get("categorySlug")
          location = self.validated_data.get("location")
          order_by_date = self.validated_data.get("order_by_date")

          if category_slug:
               queryset = queryset.filter(idcategory__categoryslug=category_slug)

          if location:
               queryset = queryset.filter(location__icontains=location)

          if order_by_date:
               order_field = 'startdate' if order_by_date == 'asc' else '-startdate'
               queryset = queryset.order_by(order_field)

          return queryset


class P_EventDetailRetrievalSerializer(serializers.Serializer):
     """
     Serializador para obtener los detalles de un evento.
     """
     eventslug = serializers.CharField()

     def get_event(self):
          """
          Obtiene el evento correspondiente al slug proporcionado.
          """
          eventslug = self.validated_data.get("eventslug")
          event = P_Event.objects.filter(eventslug=eventslug).first()

          if not event:
               raise serializers.ValidationError({"error": "Evento no encontrado."})

          return event
