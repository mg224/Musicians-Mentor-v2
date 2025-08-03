from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import StudentSerializer, TeacherSerializer, UserSerializer
from .models import Student, Teacher

User = get_user_model()

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class StudentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, student_id=None):
        if student_id:
            student = get_object_or_404(Student, id=student_id)
            serializer = StudentSerializer(instance=student)
        else:
            students = Student.objects.all()
            serializer = StudentSerializer(instance=students, many=True)

        return Response(serializer.data)
    
    def put(self, request, student_id=None):
        student = get_object_or_404(Student, id=student_id)
        serializer = StudentSerializer(instance=student)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, teacher_id=None):
        if teacher_id:
            teacher = get_object_or_404(Teacher, id=teacher_id)
            serializer = TeacherSerializer(instance=teacher)
        else:
            teachers = Teacher.objects.all()
            serializer = TeacherSerializer(instance=teachers, many=True)

        return Response(serializer.data)
    
    def put(self, request, teacher_id=None):
        teacher = get_object_or_404(Teacher, id=teacher_id)
        serializer = TeacherSerializer(instance=teacher)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
