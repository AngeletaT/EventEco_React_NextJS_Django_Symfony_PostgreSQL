from rest_framework.routers import DefaultRouter
from .views import E_EventViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'events', E_EventViewSet, basename='e_event')

urlpatterns = [
     path('listAll/', E_EventViewSet.as_view({'get': 'list_all_events'})),
] + router.urls

