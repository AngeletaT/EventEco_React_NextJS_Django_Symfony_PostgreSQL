from django.contrib.auth.models import AbstractUser
from django.db import models

class EventEcoClientUser(AbstractUser):
     # Agrega campos específicos para el cliente de EventEco
     loyalty_points = models.PositiveIntegerField(default=0)
