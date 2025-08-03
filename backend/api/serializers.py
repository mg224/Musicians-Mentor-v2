from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Student, Teacher

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        role = validated_data.get("role")

        user = User(first_name=validated_data["first_name"], last_name=validated_data["last_name"], username=validated_data["username"], role=validated_data["role"])
        user.set_password(validated_data["password"])
        user.save()

        if role == "student":
            Student.objects.create(user=user)
        elif role == "teacher":
            Teacher.objects.create(user=user)
        
        return user


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ["user", "id", "instrument", "grade_level", "location", "bio", "profile_picture"]

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = ["user", "id", "instrument", "years_experience", "location", "bio", "rate", "profile_picture"]
