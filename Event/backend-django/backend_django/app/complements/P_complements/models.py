from django.db import models

class P_Complement(models.Model):
     """
     Modelo para gestionar los complementos relacionados con los eventos en Pawnity.
     """
     idcomplement = models.AutoField(primary_key=True)
     name = models.CharField(max_length=100)
     description = models.TextField(blank=True, null=True)
     price = models.DecimalField(max_digits=10, decimal_places=2)
     imageurl = models.CharField(max_length=255, blank=True, null=True)
     eventslug = models.CharField(max_length=100)  # Relación por slug con la tabla de eventos
     isactive = models.BooleanField(default=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     class Meta:
          db_table = 'p_complements'

     def __str__(self):
          return f"{self.name} - {self.eventslug}"
