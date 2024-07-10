from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers import CategorySerializer

# POSTの時の登録処理
@api_view(['POST'])
def category_register_view(request):
    # request.dataをシリアライザーに渡す
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        # シリアライザーを使用してデータベースに保存
        serializer.save()
        return Response({'message': 'Category successfully registered', 'category_name': serializer.validated_data['name']}, status=status.HTTP_201_CREATED)
    else:
        # バリデーションエラーを処理
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
