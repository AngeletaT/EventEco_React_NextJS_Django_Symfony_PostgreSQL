from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import E_EventCategory
from .serializers import E_EventCategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class E_EventCategoryViewSet(ListModelMixin, GenericViewSet):
     queryset = E_EventCategory.objects.all().order_by('idcategory')
     serializer_class = E_EventCategorySerializer
     lookup_field = 'idcategory'

     @action(detail=False, methods=['get'], url_path='listAll')
     def list_all_categories(self, request):
          """Custom action to list all categories"""
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)