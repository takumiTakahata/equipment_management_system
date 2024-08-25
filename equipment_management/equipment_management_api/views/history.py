import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Application, Product, User

class HistoryView(APIView):
    # GETの時の一覧表示処理
    def get(self, request):
        try:
            applications = Application.objects.all()
            history_data = []

            for application in applications:
                product = Product.objects.get(id=application.product_id)
                borrower = User.objects.get(id=application.user_id)
                loan_approver = User.objects.get(id=application.loan_authorizer_id)
                return_approver = User.objects.get(id=application.return_authorizer_id) if application.return_authorizer_id else None

                history_data.append({
                    'loan_date': application.loan_date,
                    'return_date': application.return_date,
                    'product_id': product.id,
                    'product_name': product.name,
                    'deadline': application.deadline,
                    'borrower': borrower.username,
                    'loan_approver': loan_approver.username,
                    'return_approver': return_approver.username if return_approver else None
                })

            return Response(history_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
