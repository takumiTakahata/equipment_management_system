from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_view

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view),
]
