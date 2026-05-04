from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSets
router = DefaultRouter()
router.register('auth', UserViewSets, 'auth')


urlpatterns = [
    path('', include(router.urls))
    ]
