from rest_framework.routers import DefaultRouter
from .views import P_EventViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'', P_EventViewSet, basename='event')

urlpatterns = [
     path('listAll/', P_EventViewSet.as_view({'get': 'list_all_events'})),
] + router.urls

