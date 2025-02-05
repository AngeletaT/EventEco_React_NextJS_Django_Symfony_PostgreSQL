from django.urls import path
from .views import P_EventViewSet, P_EventDetailViewSet

urlpatterns = [
     path('listEvents', P_EventViewSet.as_view({'get': 'list_events'}), name='events-listEvents'),
     path('details/<str:eventslug>/', P_EventDetailViewSet.as_view({'get': 'retrieve_event_details'}), name='event-detail'),
]
