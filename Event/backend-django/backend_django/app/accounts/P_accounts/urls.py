from django.urls import path
from .views import P_ClientRegisterView, P_ClientLoginView, P_ClientMeView, P_ClientLogoutView

urlpatterns = [
     path('register', P_ClientRegisterView.as_view(), name='p_client-register'),
     path('login', P_ClientLoginView.as_view(), name='p_client-login'),
     path('me', P_ClientMeView.as_view(), name='p_client-me'),
     path('logout', P_ClientLogoutView.as_view(), name='p_client-logout'),
]
