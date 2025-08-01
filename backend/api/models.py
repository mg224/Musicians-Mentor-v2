from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
GRADE_CHOICES = [
    (1, "1st Grade"),
    (2, "2nd Grade"),
    (3, "3rd Grade"),
    (4, "4th Grade"),
    (5, "5th Grade"),
    (6, "6th Grade"),
    (7, "7th Grade"),
    (8, "8th Grade"),
    (9, "9th Grade"),
    (10, "10th Grade"),
    (11, "11th Grade"),
    (12, "12th Grade"),
]

class User(AbstractUser):
    pass

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    instrument = models.CharField(max_length=255)
    grade_level = models.IntegerField(choices=GRADE_CHOICES)
    location = models.TextField()
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    instrument = models.CharField(max_length=255)
    grade_level = models.IntegerField()
    location = models.TextField()
    bio = models.TextField()
    rate = models.FloatField()
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)