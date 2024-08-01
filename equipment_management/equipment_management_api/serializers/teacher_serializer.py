from rest_framework import serializers
from ..models import User

# 教員登録のシリアライザー
class TeacherSerializer(serializers.ModelSerializer):
    course_id = 1  # 固定のcourse_idを指定
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'course_id')
        
    def create(self, validated_data):
        validated_data['course_id'] = self.course_id  # course_idを設定
        return super().create(validated_data)
    
# 教員一覧のシリアライザー
class TeacherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')
