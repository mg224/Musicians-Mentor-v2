from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", views.RegisterUserView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("auth/", include("rest_framework.urls")),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("me/profile/", views.UserProfileView.as_view(), name="user_profile"),
    path("students/", views.StudentView.as_view(), name="students"),
    path("students/<int:student_id>/", views.StudentView.as_view(), name="students"),
    path("teachers/", views.TeacherView.as_view(), name="teachers"),
    path("teachers/<int:teacher_id>/", views.TeacherView.as_view(), name="teachers"),
    path("teachers/search/", views.TeacherSearchView.as_view(), name="teachers"),
    path("ping/", views.ping, name="ping"),
]