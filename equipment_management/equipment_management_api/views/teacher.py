from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User
from ..serializers.teacher_serializer import TeacherSerializer


class TeacherRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = TeacherSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
