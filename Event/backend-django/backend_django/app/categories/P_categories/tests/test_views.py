import pytest
from rest_framework.test import APIClient
from django.urls import reverse

@pytest.mark.django_db
def test_list_p_event_categories():
     client = APIClient()
     url = reverse('eventcategory-listAll')  # Debe resolverse correctamente
     response = client.get(url)
     
     assert response.status_code == 200
     assert isinstance(response.json(), list)
