from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from ..serializers.teacher_serializer import TeacherSerializer

# POSTの時の登録処理
@api_view(['POST'])
def teacher_register_view(request):
  # request.dataをシリアライザーに渡す
  serializer = TeacherSerializer(data=request.data)
  if serializer.is_valid():
    # パスワードをハッシュ化
    hashed_password = make_password(serializer.validated_data['password'])
    # ハッシュ化されたパスワードを再設定
    serializer.validated_data['password'] = hashed_password
    # シリアライザーを使用してデータベースに保存
    serializer.save()
    return Response({'message': 'Teacher successfully registered', 'username': serializer.validated_data['username']}, status=status.HTTP_201_CREATED)
  else:
    # バリデーションエラーを処理
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
