from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers import ApplicationSerializer
from ..models import Application
import uuid
from json import dumps
from httplib2 import Http
from datetime import datetime, timedelta
from ..models import User,Product,Course

class ApplicationView(APIView):
    # GETの時の一覧表示処理
    def get(self, request):
      application_id = request.query_params.get('id')
    
      # Applicationからデータを取得
      try:
          application = Application.objects.get(id=application_id)
      except Application.DoesNotExist:
          return Response({'error': 'Application not found'}, status=404)
      
      product_id = application.product_id
      user_id = application.user_id
      deadline = application.deadline
      thread_key = application.thread_key  # thread_keyを取得
      
      # Userからデータを取得
      try:
          user = User.objects.get(id=user_id)
      except User.DoesNotExist:
          return Response({'error': 'User not found'}, status=404)
      
      username = user.username
      course_id = user.course_id
      school_year = user.school_year  # school_yearを取得
      
      # Courseからデータを取得
      try:
          course = Course.objects.get(id=course_id)
      except Course.DoesNotExist:
          return Response({'error': 'Course not found'}, status=404)
      
      course_name = course.name
      
      # Productからデータを取得
      try:
          product = Product.objects.get(id=product_id)
      except Product.DoesNotExist:
          return Response({'error': 'Product not found'}, status=404)
      
      product_name = product.name
      
      # すべてのデータをまとめてレスポンス
      response_data = {
          'application_id': application_id,
          'product_id': product_id,
          'product_name': product_name,
          'user_id': user_id,
          'username': username,
          'course_id': course_id,
          'course_name': course_name,
          'school_year': school_year,  # school_yearをレスポンスに追加
          'deadline': deadline,
          'thread_key': thread_key  # thread_keyをレスポンスに追加
      }
      
      return Response(response_data)

    # POSTの時の登録処理
    def post(self, request):
        qr_results = request.data.get('qrResult', [])
        user_id = request.data.get('userId')
        loan_date = datetime.now().date()  # 現在の日付を設定
        return_date = datetime.now().date()
        # deadline = datetime.now().date()  # 現在の日付を設定
        loan_authorizer_id = None  # nullを設定
        return_authorizer_id = None  # nullを設定

        if not qr_results:
            return Response({'error': 'qrResult is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # user_idを使用してnameを取得
        try:
            user = User.objects.get(id=user_id)
            name = user.username
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        success_count = 0
        errors = []
        
        # Google Chatへの送信処理
        for qr_result in qr_results:
            try:
                qr_result = int(qr_result)
                product = Product.objects.get(id=qr_result)
                print(product.deadline)
                deadline = datetime.now().date() + timedelta(days=product.deadline)
                print(deadline)
                thread_key = self.generate_thread_key()
            except (ValueError, TypeError):
                errors.append({'error': f'Product ID {qr_result} must be an integer'})
                continue
            data = {
                'user': user_id,
                'thread_key': thread_key,
                'loan_date': loan_date,
                'return_date': return_date,
                'deadline': deadline,
                'product': qr_result,
                'loan_authorizer_id': loan_authorizer_id,
                'return_authorizer_id': return_authorizer_id,
            }
            print(data)
            
            serializer = ApplicationSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                # Applicationテーブルからthread_keyが一致するレコードのidを取得
                application_record = Application.objects.get(thread_key=thread_key)
                application_id = application_record.id
                self.send_message_to_google_chat(application_id, thread_key, name)
                success_count += 1
            else:
                errors.append(serializer.errors)
        
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'success_count': success_count}, status=status.HTTP_201_CREATED)
    
    def put(self, request, pk=None):
      if pk is None:
          pk = request.data.get("pk")
          if pk is None:
              return Response({"error": "pk is required"}, status=status.HTTP_400_BAD_REQUEST)

      thread_key = request.data.get("thread_key")
      if thread_key is None:
          return Response({"error": "thread_key is required"}, status=status.HTTP_400_BAD_REQUEST)

      try:
          application = Application.objects.get(pk=pk)
      except Application.DoesNotExist:
          return Response({"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND)

      user_id = request.data.get("user_id")
      if not user_id:
          return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

      application.loan_authorizer_id = user_id
      application.save()

      # 成功したら thread_key を使用して send_loan_approvalmessage_to_google_chat を実行
      self.send_loan_approvalmessage_to_google_chat(thread_key)

      return Response({"message": "Application updated successfully"}, status=status.HTTP_200_OK)

    def generate_thread_key(self):
        return str(uuid.uuid4())

    def send_message_to_google_chat(self,id,thread_key,name):
        url = "https://chat.googleapis.com/v1/spaces/AAAA_qvmoRo/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=zsW6Are3_UgC-Ujd2p6pjAOQlnvRvOVpE7naVU47sWY&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD"
        app_message = {
            "text": "{name}の貸出申請http://localhost:3000/loan_approval/?id={id}".format(id=id,name=name),
            "thread": {"threadKey": thread_key},
        }
        message_headers = {"Content-Type": "application/json; charset=UTF-8"}
        http_obj = Http()
        response = http_obj.request(
            uri=url,
            method="POST",
            headers=message_headers,
            body=dumps(app_message),
        )

    def send_loan_approvalmessage_to_google_chat(self,thread_key):
        url = "https://chat.googleapis.com/v1/spaces/AAAA_qvmoRo/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=zsW6Are3_UgC-Ujd2p6pjAOQlnvRvOVpE7naVU47sWY&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD"
        app_message = {
            "text": "貸出申請の承認完了",
            "thread": {"threadKey": thread_key},
        }
        message_headers = {"Content-Type": "application/json; charset=UTF-8"}
        http_obj = Http()
        response = http_obj.request(
            uri=url,
            method="POST",
            headers=message_headers,
            body=dumps(app_message),
        )
