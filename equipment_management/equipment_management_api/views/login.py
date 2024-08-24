from django.contrib.auth import get_user_model, authenticate
from equipment_management_api.serializers.login_serializer import LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()  # カスタムユーザーモデルを取得

class UserLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
            if user is None:
                return Response({'detail': 'Invalid credentials'}, status=401)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=400)
    
class AdminLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = authenticate(email=email, password=serializer.validated_data['password'])
            if user is None:
                return Response({'detail': 'Invalid credentials'}, status=401)
            
            # emailを使ってユーザーを取得し、admin_flagを確認
            try:
                user = User.objects.get(email=email)
                if user.admin_flag == False:  # admin_flagがFalseの場合
                    return Response({'detail': '管理者権限がありません'}, status=403)
            except User.DoesNotExist:
                return Response({'detail': 'User not found'}, status=404)
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=400)
