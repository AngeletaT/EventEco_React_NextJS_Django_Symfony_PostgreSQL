from django.urls import path
from .views import P_EventViewSet

urlpatterns = [
     path('listAll/', P_EventViewSet.as_view({'get': 'list_all_events'}), name='events-listAll'),
] 

