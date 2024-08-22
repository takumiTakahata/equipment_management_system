from ..models import Product
from rest_framework import serializers
from .category_serializer import Category

class EquipmentSerializer(serializers.ModelSerializer):
    categories_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='categories')
    class Meta:
        model = Product
        fields = ['id','name','ISBN','categories_id','deadline','lost_status','active_flag','delete_flag']
        extra_kwargs = {
            'ISBN': {'required': False},
            'categories_id': {'required': False},
            'lost_status': {'required': False},
            'active_flag': {'required': False},
            'delete_flag': {'required': False},
        }
