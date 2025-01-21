from django.contrib.auth.models import AbstractUser
from django.db import models

class EventEcoAdminUser(AbstractUser):
     # Agrega campos específicos para el admin de EventEco
     department = models.CharField(max_length=100, blank=True, null=True)
