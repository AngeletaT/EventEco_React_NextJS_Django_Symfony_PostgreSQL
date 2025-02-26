from django.db import models
from backend_django.app.events.E_events.models import E_Event 
from django.contrib.postgres.fields import ArrayField  

class E_SubEvent(models.Model):
     STATUS_CHOICES = [
          ('Confirmed', 'Confirmed'),
          ('InProgress', 'In Progress'),
          ('Finished', 'Finished'),
     ]

     idsubevents = models.AutoField(primary_key=True)
     name = models.CharField(max_length=100)
     description = models.TextField(blank=True, null=True)
     startdate = models.DateTimeField()
     enddate = models.DateTimeField()
     urlimage = ArrayField(models.CharField(max_length=255), blank=True, null=True)
     urlposter = models.CharField(max_length=255, blank=True, null=True)
     idevent = models.ForeignKey(E_Event, on_delete=models.CASCADE, db_column='idevent', related_name="subevents")
     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Confirmed')
     isactive = models.BooleanField(default=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     class Meta:
          db_table = 'e_subevents'

     def __str__(self):
          return self.name

