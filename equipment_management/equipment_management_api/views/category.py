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
