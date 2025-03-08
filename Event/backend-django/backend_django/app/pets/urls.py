from django.urls import path
from .views import PetViewSet, AdoptionCreateView, SponsorshipCreateView, GetMySponsorshipsView, GetMyAdoptionsView

urlpatterns = [
     path('listPets', PetViewSet.as_view({'get': 'list_pets'}), name='pets-listPets'),
     path('adoption', AdoptionCreateView.as_view(), name='pets-adoption'),
     path('sponsorship', SponsorshipCreateView.as_view(), name='pets-sponsorship'),
     path('mysponsorships', GetMySponsorshipsView.as_view(), name='mysponsorships'),
     path('myadoptions', GetMyAdoptionsView.as_view(), name='myadoptions')
]
