from rest_framework import serializers
from .models import User

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'email', 'password')
        
    def create(self,validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.admin_flag = validated_data.get('admin_flag', False)
        user.delete_flag = validated_data.get('delete_flag', False)
        user.save()
        return user
