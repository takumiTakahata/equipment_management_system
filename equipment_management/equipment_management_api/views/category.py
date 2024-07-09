from rest_framework import viewsets
from ..models import Category
from ..serializers import category_serializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class CategoryViewSet(viewsets.ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = category_serializer

@api_view(['POST'])
def category_register_view(request):
  category_name = request.data.get('category_name')
  return Response({'category_name': category_name})
