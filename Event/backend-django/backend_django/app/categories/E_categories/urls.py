from django.urls import path
from .views import E_EventCategoryViewSet

urlpatterns = [
     path('listAll/', E_EventCategoryViewSet.as_view({'get': 'list'}), name='eventcategory-listAll'),
]
