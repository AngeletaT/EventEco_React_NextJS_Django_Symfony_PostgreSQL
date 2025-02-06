from django.db import models

class ProfileOrganizer(models.Model):
     idprofileorg = models.AutoField(primary_key=True)
     idorg = models.IntegerField()
     name = models.CharField(max_length=100)
     address = models.CharField(max_length=200, null=True, blank=True)
     urllogo = models.CharField(max_length=255, null=True, blank=True)
     description = models.CharField(max_length=255, null=True, blank=True)
     urlweb = models.CharField(max_length=255, null=True, blank=True)
     urlimage = models.CharField(max_length=255, null=True, blank=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)

     class Meta:
          db_table = 'p_profileorganizer'

     def __str__(self):
          return self.name
