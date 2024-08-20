from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers import DepartmentSerializer
from ..models import Course

class DepartmentView(APIView):
    
    # GETの時の一覧表示処理
    def get(self, request):
        course = Course.objects.filter(delete_flag=False)
        serializer = DepartmentSerializer(course, many=True)
        return Response(serializer.data)

    # POSTの時の登録処理
    def post(self, request):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'department successfully registered', 'department_name': serializer.validated_data['name']}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUTの時の更新処理
    def put(self, request, pk):
        print("メソッド確認")
        try:
            Course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = DepartmentSerializer(Course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Course successfully updated', 'Course_name': serializer.validated_data['name']}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
