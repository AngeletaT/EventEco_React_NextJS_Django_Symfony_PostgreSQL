from django.urls import path
from .views import E_ProfileClientMeView, E_ProfileClientUpdateView

urlpatterns = [
     path('me', E_ProfileClientMeView.as_view(), name='e_profile-client-get'),  # 📥 Obtener perfil (GET)
     path('me/update', E_ProfileClientUpdateView.as_view(), name='e_profile-client-update'),  # 🔄 Actualizar perfil (PUT)
]
