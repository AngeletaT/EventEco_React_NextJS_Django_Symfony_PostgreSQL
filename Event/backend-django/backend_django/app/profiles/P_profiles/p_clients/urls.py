from django.urls import path
from .views import P_ProfileClientMeView, P_ProfileClientUpdateView

urlpatterns = [
     path('me', P_ProfileClientMeView.as_view(), name='e_profile-client-get'),  # 📥 Obtener perfil (GET)
     path('me/update', P_ProfileClientUpdateView.as_view(), name='e_profile-client-update'),  # 🔄 Actualizar perfil (PUT)
]
