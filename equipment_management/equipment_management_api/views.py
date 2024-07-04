from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

User = get_user_model()  # カスタムユーザーモデルを取得

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    return Response({'email': email, 'password': password})
