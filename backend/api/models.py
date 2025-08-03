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
    ROLE_CHOICES = (
        ("student", "Student"),
        ("teacher", "Teacher")
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, blank=True, null=True)
    
    def __str__(self):
        return self.username

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    instrument = models.CharField(max_length=255, blank=True, null=True)
    grade_level = models.IntegerField(choices=GRADE_CHOICES, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    instrument = models.CharField(max_length=255, blank=True, null=True)
    years_experience = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    rate = models.FloatField(blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"