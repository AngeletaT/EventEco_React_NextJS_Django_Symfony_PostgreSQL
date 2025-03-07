from django.urls import path
from .views import E_OrderDetailView, E_OrderCreateView, E_TicketUnitUpdateView

urlpatterns = [
     path('details/<int:idorder>/', E_OrderDetailView.as_view(), name='p_order-detail'),
     path('create/', E_OrderCreateView.as_view(), name='p_order-create'),
     path('ticketunit/<int:ticketunitid>/', E_TicketUnitUpdateView.as_view(), name='e_ticketunit-update')  # 🔥 Nueva ruta para actualizar TicketUnit
]
