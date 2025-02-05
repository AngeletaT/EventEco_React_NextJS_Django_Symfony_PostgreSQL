from django.urls import path
from .views import E_EventViewSet, E_EventDetailViewSet

urlpatterns = [
     path('listEvents', E_EventViewSet.as_view({'get': 'list_events'}), name='events-listEvents'),
     path('details/<str:eventslug>/', E_EventDetailViewSet.as_view({'get': 'retrieve_event_details'}), name='event-detail'),
]

