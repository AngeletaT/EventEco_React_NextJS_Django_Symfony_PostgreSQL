from django.urls import path
from .views import P_EventCategoryViewSet

urlpatterns = [
     path('listAll/', P_EventCategoryViewSet.as_view({'get': 'list_all_categories'}), name='eventcategory-listAll'),
]
