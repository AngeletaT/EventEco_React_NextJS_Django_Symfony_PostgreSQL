from django.urls import path
from .views import E_OrderDetailView, E_OrderCreateView, E_TicketUnitUpdateView, E_ClientDashboardView

urlpatterns = [
     path('details/<int:idorder>/', E_OrderDetailView.as_view(), name='e_order-detail'),
     path('create/', E_OrderCreateView.as_view(), name='e_order-create'),
     path('ticketunit/<int:ticketunitid>/', E_TicketUnitUpdateView.as_view(), name='e_ticketunit-update'), 
     path('dashboard/', E_ClientDashboardView.as_view(), name='e_client-dashboard')  # 🔥 Nueva ruta para actualizar TicketUnit
]
