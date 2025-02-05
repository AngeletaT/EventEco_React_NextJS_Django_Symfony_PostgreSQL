from django.urls import path
from .views import E_EventViewSet

urlpatterns = [
     path('listEvents', E_EventViewSet.as_view({'get': 'list_events'}), name='events-listEvents'),
]

