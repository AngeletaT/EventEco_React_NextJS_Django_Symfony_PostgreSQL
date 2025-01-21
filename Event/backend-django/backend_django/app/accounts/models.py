from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
     EVENTECO = 'EventEco'
     PAWNITY = 'Pawnity'

     ADMIN = 'Admin'
     CLIENT = 'Client'

     PROJECT_CHOICES = [
          (EVENTECO, 'EventEco'),
          (PAWNITY, 'Pawnity'),
     ]

     ROLE_CHOICES = [
          (ADMIN, 'Admin'),
          (CLIENT, 'Client'),
     ]

     project = models.CharField(max_length=20, choices=PROJECT_CHOICES, default=EVENTECO)
     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=CLIENT)

     # Campos adicionales específicos
     department = models.CharField(max_length=255, blank=True, null=True)  # Solo para Admin
     loyalty_points = models.PositiveIntegerField(default=0, blank=True, null=True)  # Solo para Client

     def __str__(self):
          return f"{self.username} ({self.project} - {self.role})"
