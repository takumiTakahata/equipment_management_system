from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from ..serializers.teacher_serializer import TeacherSerializer, TeacherListSerializer
from rest_framework.views import APIView
from ..models import User as Teacher

class TeacherView(APIView):
  
  # GETの時の一覧表示処理
  def get(self, request):
      teachers = Teacher.objects.all()
      serializer = TeacherListSerializer(teachers, many=True)
      return Response(serializer.data)
   
  # POSTの時の登録処理
  def post(self, request):
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

  # DELETEの時の削除処理
  def delete(self, request, pk):
    try:
      teacher = Teacher.objects.get(pk=pk)
      teacher.delete_flag = True
      teacher.save()
      return Response({'message': 'Teacher successfully marked as deleted'}, status=status.HTTP_200_OK)
    except Teacher.DoesNotExist:
      return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
        