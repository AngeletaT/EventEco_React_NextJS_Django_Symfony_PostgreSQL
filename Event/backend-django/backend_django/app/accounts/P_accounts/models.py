from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class P_ClientManager(BaseUserManager):
     """
     Manager personalizado para manejar la creación de clientes de Pawnity.
     """
     def create_user(self, email, password=None, **extra_fields):
          if not email:
               raise ValueError("El email es obligatorio para registrar un usuario")
          email = self.normalize_email(email)
          user = self.model(email=email, **extra_fields)
          user.set_password(password)  # Hashea la contraseña con Argon2
          user.save(using=self._db)
          return user

     def create_superuser(self, email, password=None, **extra_fields):
          extra_fields.setdefault("is_active", True)
          extra_fields.setdefault("is_staff", True)
          extra_fields.setdefault("is_superuser", True)
          return self.create_user(email, password, **extra_fields)


class P_Client(AbstractBaseUser, PermissionsMixin):
     """
     Modelo de cliente para Pawnity.
     """
     idclient = models.AutoField(primary_key=True)
     clientuuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
     email = models.EmailField(max_length=100, unique=True)
     password = models.CharField(max_length=255)
     refreshtoken = models.CharField(max_length=1024, blank=True, null=True)
     isactive = models.BooleanField(default=True)

     # ⚠️ Campos que Django espera pero no existen en tu DB:
     last_login = models.DateTimeField(blank=True, null=True)  # Evita el error de 'last_login'
     is_superuser = models.BooleanField(default=False)  # Necesario para Django Admin
     is_staff = models.BooleanField(default=False)  # Necesario para Django Admin

     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     objects = P_ClientManager()

     USERNAME_FIELD = 'email'  # Campo de autenticación principal
     REQUIRED_FIELDS = ['isactive']  # Lista de campos requeridos además del email

     class Meta:
          db_table = 'p_client'

     def __str__(self):
          return f"{self.email} - Pawnity Client"
