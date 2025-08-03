from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import StudentSerializer, TeacherSerializer, UserSerializer
from .models import Student, Teacher

User = get_user_model()

class RegisterUserView(generics.CreateAPIView):
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
            return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"detail": "Error logging out."}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == "student":
            try:
                student_profile = user.student
            except Student.DoesNotExist:
                return Response({"detail": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = StudentSerializer(student_profile)
            return Response(serializer.data)
        
        elif user.role == "teacher":
            try:
                teacher_profile = user.teacher
            except Teacher.DoesNotExist:
                return Response({"detail": "Teacher profile not found."}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = TeacherSerializer(teacher_profile)
            return Response(serializer.data)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = request.user

        if user.role == "student":
            try:
                student_profile = user.student
            except Student.DoesNotExist:
                return Response({"detail": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = StudentSerializer(student_profile, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif user.role == "teacher":
            try:
                teacher_profile = user.teacher
            except Teacher.DoesNotExist:
                return Response({"detail": "Teacher profile not found."}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = TeacherSerializer(teacher_profile, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
        

class StudentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, student_id=None):
        if student_id:
            student = get_object_or_404(Student, pk=student_id)
            serializer = StudentSerializer(student)
        else:
            students = Student.objects.all()
            serializer = StudentSerializer(students, many=True)
        
        return Response(serializer.data)

    def put(self, request, student_id=None):
        student = get_object_or_404(Student, pk=student_id)
        serializer = StudentSerializer(student, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, teacher_id=None):
        if teacher_id:
            teacher = get_object_or_404(Student, pk=teacher_id)
            serializer = TeacherSerializer(teacher)
        else:
            teachers = Teacher.objects.all()
            serializer = TeacherSerializer(teachers, many=True)
        
        return Response(serializer.data)

    def put(self, request, teacher_id=None):
        teacher = get_object_or_404(Teacher, pk=teacher_id)
        serializer = TeacherSerializer(teacher, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def ping(request):
    return Response(status=status.HTTP_200_OK)