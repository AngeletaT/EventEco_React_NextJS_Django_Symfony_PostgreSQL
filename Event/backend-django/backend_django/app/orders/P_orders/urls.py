from django.urls import path
from .views import P_OrderDetailView, P_OrderCreateView, P_TicketUnitUpdateView, P_ClientDashboardView

urlpatterns = [
     path('details/<int:idorder>/', P_OrderDetailView.as_view(), name='p_order-detail'),
     path('create/', P_OrderCreateView.as_view(), name='p_order-create'),
     path('ticketunit/<int:ticketunitid>/', P_TicketUnitUpdateView.as_view(), name='p_ticketunit-update'), 
     path('dashboard/', P_ClientDashboardView.as_view(), name='p_client-dashboard')
]
