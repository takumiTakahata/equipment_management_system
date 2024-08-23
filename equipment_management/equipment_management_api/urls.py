from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginView,CategoryView,TeacherView,StudentView,DepartmentView,EquipmentView,qr_code_view

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
    path('category/', CategoryView.as_view()),
    path('category/<int:pk>/', CategoryView.as_view()),
    path('teacher/', TeacherView.as_view()),
    path('teacher/<int:pk>/', TeacherView.as_view()),
    path('department/',DepartmentView.as_view()),
    path('department/<int:pk>/',DepartmentView.as_view()),
    path('student/', StudentView.as_view()),
    path('student/<int:pk>/', StudentView.as_view()),
    path('equipment/', EquipmentView.as_view()),
    path('equipment/<int:pk>/', EquipmentView.as_view()),
    path('qr/', qr_code_view, name='qr_code_view'),
]
