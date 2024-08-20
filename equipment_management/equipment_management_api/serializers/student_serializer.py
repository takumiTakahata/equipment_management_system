from rest_framework import serializers
from ..models import User

# 学生登録のシリアライザー
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'course_id')
        
    def create(self, validated_data):
        return super().create(validated_data)
    
# 学生一覧のシリアライザー
class StudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
