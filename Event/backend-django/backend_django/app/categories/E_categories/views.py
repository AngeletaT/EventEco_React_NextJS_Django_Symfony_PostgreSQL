from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from .models import E_EventCategory
from .serializers import E_EventCategorySerializer

class E_EventCategoryViewSet(ListModelMixin, GenericViewSet):
     queryset = E_EventCategory.objects.all().order_by('createdat')
     serializer_class = E_EventCategorySerializer
