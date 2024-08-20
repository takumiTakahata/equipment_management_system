from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from ..serializers.student_serializer import StudentSerializer, StudentListSerializer
from rest_framework.views import APIView
from ..models import User as Student

class StudentView(APIView):

  # POSTの時の登録処理
  def post(self, request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
      # パスワードをハッシュ化
      hashed_password = make_password(serializer.validated_data['password'])
      # ハッシュ化されたパスワードを再設定
      serializer.validated_data['password'] = hashed_password
      # シリアライザーを使用してデータベースに保存
      serializer.save()
      return Response({'message': 'student successfully registered', 'username': serializer.validated_data['username']}, status=status.HTTP_201_CREATED)
    else:
      # バリデーションエラーを処理
      print(serializer.errors)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
