from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers import CategorySerializer
from ..models import Category

class CategoryView(APIView):
    
    # GETの時の一覧表示処理
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    # POSTの時の登録処理
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Category successfully registered', 'category_name': serializer.validated_data['name']}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUTの時の更新処理
    def put(self, request, pk):
        print("メソッド確認")
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Category successfully updated', 'category_name': serializer.validated_data['name']}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
