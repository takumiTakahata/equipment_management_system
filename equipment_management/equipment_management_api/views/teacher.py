from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from ..serializers.teacher_serializer import TeacherSerializer, TeacherListSerializer
from rest_framework.views import APIView
from ..models import User as Teacher

class TeacherView(APIView):
  
  # GETの時の一覧表示処理
  def get(self, request, pk=None):
    if pk:
      try:
        teacher = Teacher.objects.filter(pk=pk, delete_flag=False,admin_flag=True)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)
      except Teacher.DoesNotExist:
        return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
      teachers = Teacher.objects.filter(delete_flag=False,admin_flag=True).order_by('id')
      serializer = TeacherListSerializer(teachers, many=True)
      return Response(serializer.data)
   
  # POSTの時の登録処理
  def post(self, request):
    request.data['admin_flag'] = True
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

 # PUTの時の更新処理
  def put(self, request, pk):
    try:
      teacher = Teacher.objects.get(pk=pk)
    except Teacher.DoesNotExist:
      return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = TeacherSerializer(teacher, data=request.data, partial=True)
    if serializer.is_valid():
      # パスワードが提供されている場合はハッシュ化
      if 'password' in serializer.validated_data:
        hashed_password = make_password(serializer.validated_data['password'])
        serializer.validated_data['password'] = hashed_password
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
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
        