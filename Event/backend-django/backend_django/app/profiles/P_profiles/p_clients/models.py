from django.db import models

class P_ProfileClient(models.Model):
     """
     Modelo para los perfiles de clientes de PaWnity.
     No está relacionado directamente con la tabla de autenticación.
     """
     idprofileclient = models.AutoField(primary_key=True)
     idclient = models.IntegerField()  # Se buscará manualmente con el `idclient` del token
     firstname = models.CharField(max_length=100)
     lastname = models.CharField(max_length=100)
     phonenumber = models.CharField(max_length=20, blank=True, null=True)
     dni = models.CharField(max_length=20, unique=True)
     bio = models.CharField(max_length=255, blank=True, null=True)
     avatarurl = models.CharField(max_length=255, blank=True, null=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     class Meta:
          db_table = "p_profileclient"

     def __str__(self):
          return f"{self.firstname} {self.lastname} - Profile ID: {self.idprofileclient}"
