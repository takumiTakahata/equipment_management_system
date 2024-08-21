from ..models import Product
from rest_framework import serializers
from .category_serializer import Category

class EquipmentSerializer(serializers.ModelSerializer):
    categories_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='categories')
    class Meta:
        model = Product
        fields = ['name','ISBN','categories_id','deadline',]
        extra_kwargs = {
            'ISBN': {'required': False},
            'categories_id': {'required': False},
        }
