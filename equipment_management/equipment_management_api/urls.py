from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_view
from .views import CategoryView
from .views import teacher_register_view

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view),
    path('category/', CategoryView.as_view()),
    path('teacher/', teacher_register_view),
]
