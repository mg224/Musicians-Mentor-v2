from django.contrib.auth import get_user_model
from rest_framework import serializers

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