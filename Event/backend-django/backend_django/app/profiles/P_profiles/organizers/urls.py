from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProfileOrganizerViewSet

router = DefaultRouter()

urlpatterns = [
     path('listAll', ProfileOrganizerViewSet.as_view({'get': 'list_all_organizers'}), name='list_all_organizers'),
]
