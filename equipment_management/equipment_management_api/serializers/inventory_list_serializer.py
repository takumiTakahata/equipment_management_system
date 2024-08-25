from rest_framework import serializers
from ..models import InventoryList

class InventoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryList
        fields = '__all__'
