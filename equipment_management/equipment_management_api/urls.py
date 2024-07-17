from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_view
from .views import category_register_view
from .views import teacher_register_view

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view),
    path('teacher/', teacher_register_view),
    path('category/', category_register_view),
]
