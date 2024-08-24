from ..models import Application
from rest_framework import serializers
from .student_serializer import User
from .teacher_serializer import User
from .student_serializer import UserSerializer
from .department_serializer import CourseSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        extra_kwargs = {
            'loan_authorizer_id': {'required': False},
            'return_authorizer_id': {'required': False},
            'deadline': {'required': False},
        }
