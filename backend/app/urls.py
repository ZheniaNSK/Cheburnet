from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSets, ChatViewSets
router = DefaultRouter()
router.register('auth', UserViewSets, 'auth')
router.register('chat', ChatViewSets, 'chat')


urlpatterns = [
    path('', include(router.urls))
    ]
