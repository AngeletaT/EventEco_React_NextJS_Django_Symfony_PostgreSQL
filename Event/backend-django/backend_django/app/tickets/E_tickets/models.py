from django.db import models

class E_TicketInfo(models.Model):
     """
     Modelo para gestionar la información de los tickets relacionados con los eventos en Eventeco.
     """
     idticketinfo = models.AutoField(primary_key=True)
     eventslug = models.CharField(max_length=100)  # Relación con el evento mediante el slug
     type = models.CharField(max_length=50)
     price = models.DecimalField(max_digits=10, decimal_places=2)
     capacity = models.IntegerField(blank=True, null=True)
     remaining = models.IntegerField(blank=True, null=True)
     descripcion = models.CharField(max_length=255, blank=True, null=True)
     isactive = models.BooleanField(default=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     class Meta:
          db_table = 'e_ticketinfo'

     def __str__(self):
          return f"{self.type} - {self.eventslug} (${self.price})"
