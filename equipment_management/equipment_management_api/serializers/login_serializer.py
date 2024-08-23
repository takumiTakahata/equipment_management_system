from django.contrib.auth import authenticate
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(request=self.context.get('request'), email=data['email'], password=data['password'])
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        return data
