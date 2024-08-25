from rest_framework import serializers
from ..models import User
from ..models import Course

# 学生登録のシリアライザー
class StudentSerializer(serializers.ModelSerializer):
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source='course'
    )
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'course_id', 'school_year')
        
    def create(self, validated_data):
        return super().create(validated_data)
    
# 学生一覧のシリアライザー
class StudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'course_id', 'school_year')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'school_year', 'course_id']
