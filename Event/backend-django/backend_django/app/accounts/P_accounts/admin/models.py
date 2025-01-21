from django.contrib.auth.models import AbstractUser
from django.db import models

class PawnityAdminUser(AbstractUser):
     # Agrega campos específicos para el admin de Pawnity
     region = models.CharField(max_length=100, blank=True, null=True)
