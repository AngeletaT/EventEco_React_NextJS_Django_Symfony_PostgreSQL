from rest_framework.routers import DefaultRouter
from .views import E_EventCategoryViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'categories', E_EventCategoryViewSet, basename='eventcategory')

urlpatterns = [
     path('listAll/', E_EventCategoryViewSet.as_view({'get': 'list_all_categories'})),
] + router.urls
