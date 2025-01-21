from django.contrib.auth.models import AbstractUser
from django.db import models

class PawnityClientUser(AbstractUser):
     # Agrega campos específicos para el cliente de Pawnity
     preferred_category = models.CharField(max_length=100, blank=True, null=True)

