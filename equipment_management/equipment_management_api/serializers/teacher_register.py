from rest_framework import serializers
from .models import User

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'password')
        extra_kwargs = {'password': {'write_only': True}}
