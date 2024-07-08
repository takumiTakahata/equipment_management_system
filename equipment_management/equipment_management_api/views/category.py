from rest_framework import viewsets
from ..models import Category
from ..serializers import category_serializer

class CategoryViewSet(viewsets.ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = category_serializer

