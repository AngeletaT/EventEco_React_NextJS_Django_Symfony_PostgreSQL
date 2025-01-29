from django.urls import path
from .views import E_EventViewSet

urlpatterns = [
     path('listAll/', E_EventViewSet.as_view({'get': 'list_all_events'}), name='events-listAll'),
] 


