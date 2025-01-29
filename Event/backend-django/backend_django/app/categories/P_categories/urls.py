from rest_framework.routers import DefaultRouter
from .views import P_EventCategoryViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'categories', P_EventCategoryViewSet, basename='eventcategory')

urlpatterns = [
     path('listAll/', P_EventCategoryViewSet.as_view({'get': 'list_all_categories'}), name='eventcategory-listAll'),
] + router.urls