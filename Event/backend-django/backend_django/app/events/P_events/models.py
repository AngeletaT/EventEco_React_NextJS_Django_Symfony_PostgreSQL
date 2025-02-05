from django.db import models
from django.contrib.postgres.fields import ArrayField
from backend_django.app.categories.P_categories.models import P_EventCategory

class P_Event(models.Model):
     STATUS_CHOICES = [
          ('Preparing', 'Preparing'),
          ('Created', 'Created'),
          ('InProgress', 'InProgress'),
          ('Finished', 'Finished'),
          ('Cancelled', 'Cancelled'),
     ]

     idevent = models.AutoField(primary_key=True)
     name = models.CharField(max_length=100, unique=True)
     eventslug = models.CharField(max_length=100, unique=True)
     startdate = models.DateField()
     enddate = models.DateField()
     location = models.CharField(max_length=255, null=True, blank=True)
     description = models.TextField(null=True, blank=True)
     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Preparing')
     urlimage = ArrayField(models.URLField(max_length=255), null=True, blank=True)
     urlposter = models.URLField(max_length=255, null=True, blank=True)
     orgid = models.IntegerField() 
     idcategory = models.ForeignKey(P_EventCategory, on_delete=models.CASCADE, db_column='idcategory')
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     class Meta:
          db_table = 'p_events'

     def __str__(self):
          return self.name