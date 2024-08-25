from rest_framework import serializers
from ..models import Inventory, InventoryList, Product, User

class InventorySerializer(serializers.ModelSerializer):
    product_names = serializers.SerializerMethodField()
    borrower = serializers.SerializerMethodField()

    class Meta:
        model = Inventory
        fields = ['day', 'product_names', 'borrower']

    def get_product_names(self, obj):
        inventory_lists = InventoryList.objects.filter(inventories_id=obj.id)
        product_names = [Product.objects.get(id=inv_list.product_id).name for inv_list in inventory_lists]
        return product_names

    def get_borrower(self, obj):
        borrower = User.objects.get(id=obj.teacher_id).username
        return borrower
