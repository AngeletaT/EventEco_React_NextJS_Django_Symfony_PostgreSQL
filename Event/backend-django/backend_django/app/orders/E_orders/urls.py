from django.urls import path
from .views import E_OrderDetailView, E_OrderCreateView

urlpatterns = [
     path('details/<int:idorder>/', E_OrderDetailView.as_view(), name='p_order-detail'),
     path('create/', E_OrderCreateView.as_view(), name='p_order-create')
]
