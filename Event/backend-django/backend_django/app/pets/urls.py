from django.urls import path
from .views import PetViewSet

urlpatterns = [
     path('listPets', PetViewSet.as_view({'get': 'list_pets'}), name='pets-listPets'),
]
