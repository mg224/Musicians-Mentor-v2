from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend
from .filters import TeacherFilter
from .serializers import StudentSerializer, TeacherSerializer, UserSerializer
from .models import Student, Teacher
from .utils import upload_to_supabase_storage, delete_from_supabase_storage

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
            
            old_profile_picture = student_profile.profile_picture
            
            if "profile_picture" in request.FILES:
                success, result = upload_to_supabase_storage(request.FILES["profile_picture"])
                if success:
                    if old_profile_picture:
                        delete_success, delete_message = delete_from_supabase_storage(old_profile_picture)
                        if not delete_success:
                            print(f"Warning: Could not delete old profile picture: {delete_message}")
                    
                    request.data._mutable = True
                    request.data["profile_picture"] = result
                else:
                    return Response({"error": result}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = StudentSerializer(student_profile, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif user.role == "teacher":
            try:
                teacher_profile = user.teacher
            except Teacher.DoesNotExist:
                return Response({"detail": "Teacher profile not found."}, status=status.HTTP_404_NOT_FOUND)
            
            old_profile_picture = teacher_profile.profile_picture
            
            if "profile_picture" in request.FILES:
                success, result = upload_to_supabase_storage(request.FILES["profile_picture"])
                if success:
                    if old_profile_picture:
                        delete_success, delete_message = delete_from_supabase_storage(old_profile_picture)
                        if not delete_success:
                            print(f"Warning: Could not delete old profile picture: {delete_message}")
                    
                    request.data_mutable = True
                    request.data["profile_picture"] = result

                else:
                    return Response({"error": result}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = TeacherSerializer(teacher_profile, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
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

class TeacherView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, teacher_id=None):
        if teacher_id:
            teacher = get_object_or_404(Teacher, pk=teacher_id)
            serializer = TeacherSerializer(teacher)
        else:
            teachers = Teacher.objects.all()
            serializer = TeacherSerializer(teachers, many=True)
        
        return Response(serializer.data)

class TeacherSearchView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeacherSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TeacherFilter
    queryset = Teacher.objects.all().order_by('id')

@api_view(['GET', 'HEAD'])
@permission_classes([AllowAny])
def ping(request):
    return Response(status=status.HTTP_200_OK)