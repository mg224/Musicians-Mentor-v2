from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Student, Teacher

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name", "role"]
    
    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        
        role = validated_data.get("role")
        if role == "student":
            from .models import Student
            Student.objects.create(user=user)
        elif role == "teacher":
            from .models import Teacher
            Teacher.objects.create(user=user)
            
        return user

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "user", "instrument", "grade_level", "location", "bio", "profile_picture"]
        extra_kwargs = {
            "user": {
                "read_only": True
            }
        }