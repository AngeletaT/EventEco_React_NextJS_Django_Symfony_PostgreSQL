from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import P_EventCategory
from .serializers import P_EventCategorySerializer

class P_EventCategoryViewSet(ListModelMixin, GenericViewSet):
     queryset = P_EventCategory.objects.all().order_by('createdat')
     serializer_class = P_EventCategorySerializer
