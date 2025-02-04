from django.db import models

class E_EventCategory(models.Model):
     idcategory = models.AutoField(primary_key=True)
     categoryname = models.CharField(max_length=100, unique=True)
     categoryslug = models.CharField(max_length=100, unique=True)
     imageurl = models.URLField(max_length=255, null=True, blank=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     class Meta:
          db_table = 'e_eventcategories'  
          verbose_name = 'EventEco Event Category'
          verbose_name_plural = 'EventEco Event Categories'

     def __str__(self):
          return self.categoryname
