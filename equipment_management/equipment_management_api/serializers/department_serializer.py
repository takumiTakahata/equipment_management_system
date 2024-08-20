from ..models import Course
from rest_framework import serializers

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'course_year']
