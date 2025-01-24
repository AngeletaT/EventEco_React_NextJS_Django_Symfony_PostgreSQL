from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import E_Event
from .serializers import E_EventSerializer

class E_EventViewSet(ListModelMixin, GenericViewSet):
     queryset = E_Event.objects.all().order_by('idevent')
     serializer_class = E_EventSerializer
     lookup_field = 'idevent'

     @action(detail=False, methods=['get'], url_path='listAll')
     def list_all_events(self, request):
          """Custom action to list all events"""
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)