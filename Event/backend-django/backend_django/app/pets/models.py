from django.db import models
import uuid
from backend_django.app.profiles.P_profiles.organizers.models import ProfileOrganizer 

class Pet(models.Model):
     class Gender(models.TextChoices):
          MALE = 'male', 'Male'
          FEMALE = 'female', 'Female'

     class Status(models.TextChoices):
          AVAILABLE = 'available', 'Available'
          SPONSORED = 'sponsored', 'Sponsored'

     idpet = models.AutoField(primary_key=True)
     uuidpet = models.UUIDField(default=uuid.uuid4, unique=True, null=False)
     name = models.CharField(max_length=100)
     species = models.CharField(max_length=50)
     breed = models.CharField(max_length=100)
     gender = models.CharField(max_length=6, choices=Gender.choices)
     birthdate = models.DateField(null=True, blank=True)
     description = models.TextField(null=True, blank=True)
     image = models.CharField(max_length=255, null=True, blank=True)
     status = models.CharField(max_length=10, choices=Status.choices, default=Status.AVAILABLE)
     idorg = models.ForeignKey(ProfileOrganizer, related_name='pets', on_delete=models.CASCADE, db_column='idorg')
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)
     isactive = models.BooleanField(default=True)


     class Meta:
          db_table = 'p_pets'

     def __str__(self):
          return self.name
     
# 🏠 Modelo para Adopciones
class Adoption(models.Model):
     idadoption = models.AutoField(primary_key=True)
     idclient = models.IntegerField(db_column='idclient')
     idpet = models.ForeignKey(Pet, related_name='adoptions', on_delete=models.CASCADE, db_column='idpet')
     idorg = models.ForeignKey(ProfileOrganizer, related_name='adoptions', on_delete=models.CASCADE, db_column='idorg')
     adoptiondate = models.DateField(auto_now_add=True)
     lastreviewdate = models.DateField(null=True, blank=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)
     isactive = models.BooleanField(default=True)

     class Meta:
          db_table = 'p_adoptions'

     def __str__(self):
          return f"Adoption {self.idadoption} - Client {self.idclient}"


# 💰 Modelo para Apadrinamientos / Suscripciones
class Sponsorship(models.Model):
     idsponsorship = models.AutoField(primary_key=True)
     idclient = models.IntegerField(db_column='idclient')
     idorg = models.ForeignKey(ProfileOrganizer, related_name='sponsorships', on_delete=models.CASCADE, db_column='idorg')
     idpet = models.ForeignKey(Pet, related_name='sponsorships', on_delete=models.CASCADE, db_column='idpet')
     startdate = models.DateTimeField(auto_now_add=True)
     enddate = models.DateTimeField(null=True, blank=True)
     createdat = models.DateTimeField(auto_now_add=True)
     updatedat = models.DateTimeField(auto_now=True)
     isactive = models.BooleanField(default=True)

     class Meta:
          db_table = 'p_sponsorships'

     def __str__(self):
          return f"Sponsorship {self.idsponsorship} - Client {self.idclient}"