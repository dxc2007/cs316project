from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models

# Create your models here.
class Site(models.Model):
    siteid = models.AutoField(primary_key=True)
    zip_code = models.IntegerField()
    city = models.CharField(max_length=256)
    state = models.CharField(max_length=256)

    class Meta:
        unique_together = ('zip_code', 'city', 'state')

    def __str__(self):
        return "{}, {} {}".format(self.city, self.state, self.zip_code)

class Employer(models.Model):
    employerid = models.AutoField(primary_key=True)
    employer_name = models.CharField(max_length=256, unique=True)
    industry = models.CharField(max_length=256, null=True)

    def __str__(self):
        return "{}, {}".format(self.employer_name, self.industry)

class WagePosting(models.Model):
    postingid = models.AutoField(primary_key=True)
    siteid = models.ForeignKey(Site, related_name='wageposting', on_delete=models.PROTECT)
    employerid = models.ForeignKey(Employer, on_delete=models.PROTECT)
    uid = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    position = models.CharField(max_length=256)
    wage = models.IntegerField(validators=[MinValueValidator(0)])
    year = models.IntegerField()

    def __str__(self):
        return "{}".format(self.postingid)

class WageBuffer(models.Model):
    postingid = models.AutoField(primary_key=True)
    siteid = models.ForeignKey(Site, on_delete=models.PROTECT)
    employerid = models.ForeignKey(Employer, on_delete=models.PROTECT)
    uid = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    position = models.CharField(max_length=256)
    wage = models.IntegerField(validators=[MinValueValidator(0)])
    year = models.IntegerField()

class HousingPosting(models.Model):
    postingid = models.AutoField(primary_key=True)
    siteid = models.ForeignKey(Site, related_name='housingposting', on_delete=models.PROTECT)
    price = models.IntegerField(validators=[MinValueValidator(0)])
    year = models.IntegerField()

    def __str__(self):
        return "{} {} {}".format(self.postingid, self.uid, self.year)

class HousingBuffer(models.Model):
    postingid = models.AutoField(primary_key=True)
    siteid = models.ForeignKey(Site, on_delete=models.PROTECT)
    price = models.IntegerField(validators=[MinValueValidator(0)])
    year = models.IntegerField()
