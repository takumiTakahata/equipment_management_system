from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Application, Product, User,Inventory

class InventoryView(APIView):
  def get(self, request):
    today = datetime.now().date()
    inventories = Inventory.objects.filter(day=today)
    inventory_ids = [inventory.id for inventory in inventories]
    return Response({'inventory_ids': inventory_ids}, status=status.HTTP_200_OK)
    
  def post(self, request):
    user_id = request.data.get('user_id')
    delete_flag = request.data.get('delete_flag', False)
    print(user_id)
    print(delete_flag)
    if not user_id:
        return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    inventory = Inventory(
        teacher=user,
        day=datetime.now().date(),
        delete_flag=delete_flag
    )
    inventory.save()

    return Response({'message': 'Inventory successfully registered'}, status=status.HTTP_201_CREATED)
