from django.urls import path
from .views import P_OrderDetailView, P_OrderCreateView

urlpatterns = [
     path('details/<int:idorder>/', P_OrderDetailView.as_view(), name='p_order-detail'),
     path('create/', P_OrderCreateView.as_view(), name='p_order-create')
]
