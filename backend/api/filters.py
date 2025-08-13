import django_filters
from .models import Teacher

class TeacherFilter(django_filters.FilterSet):
    class Meta:
        model = Teacher
        fields = {
            "instrument": ["icontains"],
            "rate": ["lt", "lte", "gt", "gte"],
            "location": ["icontains"],
            "bio": ["icontains"],
            "years_experience": ["lt", "lte", "gt", "gte"]
        }