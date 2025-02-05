from django.urls import path
from .views import P_EventViewSet

urlpatterns = [
     path('listEvents', P_EventViewSet.as_view({'get': 'list_events'}), name='events-listEvents'),
]
