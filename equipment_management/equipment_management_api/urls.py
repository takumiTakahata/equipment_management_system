from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserLoginView,AdminLoginView,CategoryView,TeacherView,StudentView,DepartmentView,EquipmentView,qr_code_view,ApplicationView,HistoryView,UserApplicationView,InventoryView,InventoryListView,BookView

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/login/', UserLoginView.as_view()),
    path('admin/login/', AdminLoginView.as_view()),
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
    path('application/', ApplicationView.as_view()),
    path('user_top/<int:user_id>/', UserApplicationView.as_view()),
    path('application/<int:pk>/', ApplicationView.as_view()),
    path('loan_approval/<int:pk>/', ApplicationView.as_view()),
    path('loan_approval/', ApplicationView.as_view()),
    path('history/', HistoryView.as_view()),
    path('inventory/', InventoryView.as_view()),
    path('inventory_lists/', InventoryListView.as_view()),
    path('book/<int:isbn>/', BookView.as_view()),
]
