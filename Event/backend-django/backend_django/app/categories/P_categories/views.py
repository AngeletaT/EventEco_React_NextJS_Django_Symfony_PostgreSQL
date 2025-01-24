from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import P_EventCategory
from .serializers import P_EventCategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class P_EventCategoryViewSet(ListModelMixin, GenericViewSet):
     queryset = P_EventCategory.objects.all().order_by('createdat')
     serializer_class = P_EventCategorySerializer
     lookup_field = 'idcategory'

     @action(detail=False, methods=['get'], url_path='listAll')
     def list_all_categories(self, request):
          """Custom action to list all categories"""
          queryset = self.get_queryset()
          serializer = self.get_serializer(queryset, many=True)
          return Response(serializer.data)
