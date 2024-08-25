from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Application, Product, User,InventoryList,Inventory
from ..serializers import InventorySerializer

class InventoryListView(APIView):
  def get(self, request):
        try:
            inventories = Inventory.objects.all()
            serializer = InventorySerializer(inventories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print("Exception:", str(e))
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
  def post(self, request):
        inventory_ids = request.data.get('inventory_ids')
        rows = request.data.get('rows', [])
        delete_flag = request.data.get('delete_flag', False)
        print(delete_flag)
        print(inventory_ids)
        print(rows)

        for row in rows:
                row_id = row.get('id')
                inventory_list = InventoryList(
                    inventories_id=inventory_ids[0],
                    product_id=row_id,
                    delete_flag=delete_flag
                )
                inventory_list.save()

        return Response({'message': 'Inventory lists successfully registered'}, status=status.HTTP_201_CREATED)
