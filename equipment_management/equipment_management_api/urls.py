from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_view
from .views import CategoryView
from .views import TeacherView
from .views import DepartmentView

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view),
    path('category/', CategoryView.as_view()),
    path('category/<int:pk>/', CategoryView.as_view()),
    path('teacher/', TeacherView.as_view()),
    path('teacher/<int:pk>/', TeacherView.as_view()),
    path('department/',DepartmentView.as_view()),
    path('department/<int:pk>/',DepartmentView.as_view()),
]
