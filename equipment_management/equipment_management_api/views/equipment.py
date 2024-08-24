from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers import EquipmentSerializer
from ..models import Product
import requests
from datetime import datetime, timedelta

class EquipmentView(APIView):
  
  # GETの時の一覧表示処理
  def get(self, request, pk=None):
      if pk:
          try:
              product = Product.objects.get(pk=pk, delete_flag=False)
              serializer = EquipmentSerializer(product)
              return Response(serializer.data, status=status.HTTP_200_OK)
          except Product.DoesNotExist:
              return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
      else:
          products = Product.objects.filter(delete_flag=False)
          serializer = EquipmentSerializer(products, many=True)
          return Response(serializer.data, status=status.HTTP_200_OK)

  # POSTの時の登録処理
  def post(self, request):
      serializer = EquipmentSerializer(data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response({'message': 'product successfully registered', 'product_name': serializer.validated_data['name']}, status=status.HTTP_201_CREATED)
      else:
          print(serializer.errors)
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # PUTの時の更新処理
  def put(self, request, pk):
      print("メソッド確認")
      try:
          product = Product.objects.get(pk=pk)
      except Product.DoesNotExist:
          return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

      serializer = EquipmentSerializer(product, data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response({'message': 'Product successfully updated', 'Product_name': serializer.validated_data['name']}, status=status.HTTP_200_OK)
      else:
          return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # DELETEの時の削除処理
  def delete(self, request, pk):
      try:
          product = Product.objects.get(pk=pk)
          product.delete_flag = True
          product.save()
          return Response({'message': 'Product successfully marked as deleted'}, status=status.HTTP_200_OK)
      except Product.DoesNotExist:
          return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
