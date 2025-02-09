from django.urls import path
from .views import E_ClientRegisterView, E_ClientLoginView, E_ClientMeView, E_ClientLogoutView

urlpatterns = [
     path('register', E_ClientRegisterView.as_view(), name='e_client-register'),
     path('login', E_ClientLoginView.as_view(), name='e_client-login'),
     path('me', E_ClientMeView.as_view(), name='e_client-me'),
     path('logout', E_ClientLogoutView.as_view(), name='e_client-logout'),
]
