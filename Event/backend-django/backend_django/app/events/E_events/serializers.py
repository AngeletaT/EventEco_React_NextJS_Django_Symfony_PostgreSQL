from rest_framework import serializers
from .models import E_Event
from backend_django.app.categories.E_categories.serializers import E_EventCategorySerializer
from backend_django.app.subEvents.E_subEvents.serializers import E_SubEventSerializer
from backend_django.app.complements.E_complements.serializers import E_ComplementSerializer
from backend_django.app.tickets.E_tickets.serializers import E_TicketInfoSerializer
from backend_django.app.complements.E_complements.models import E_Complement
from backend_django.app.tickets.E_tickets.models import E_TicketInfo


class E_EventSerializer(serializers.ModelSerializer):
     category = E_EventCategorySerializer(source='idcategory', read_only=True)

     class Meta:
          model = E_Event
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


class E_EventDetailSerializer(serializers.ModelSerializer):
     category = E_EventCategorySerializer(source='idcategory', read_only=True)
     subevents = E_SubEventSerializer(many=True, read_only=True)
     complements = serializers.SerializerMethodField()
     tickets = serializers.SerializerMethodField()

     class Meta:
          model = E_Event
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
          complements = E_Complement.objects.filter(eventslug=obj.eventslug, isactive=True)
          return E_ComplementSerializer(complements, many=True).data

     def get_tickets(self, obj):
          """
          Devuelve la lista de tickets asociados al evento mediante eventslug.
          """
          tickets = E_TicketInfo.objects.filter(eventslug=obj.eventslug, isactive=True)
          return E_TicketInfoSerializer(tickets, many=True).data


class E_EventFilterSerializer(serializers.Serializer):
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


class E_EventDetailRetrievalSerializer(serializers.Serializer):
     """
     Serializador para obtener los detalles de un evento.
     """
     eventslug = serializers.CharField()

     def get_event(self):
          """
          Obtiene el evento correspondiente al slug proporcionado.
          """
          eventslug = self.validated_data.get("eventslug")
          event = E_Event.objects.filter(eventslug=eventslug).first()

          if not event:
               raise serializers.ValidationError({"error": "Evento no encontrado."})

          return event
