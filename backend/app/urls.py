from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSets, ChatViewSets, MassageViewSets
router = DefaultRouter()
router.register('auth', UserViewSets, 'auth')
router.register('chat', ChatViewSets, 'chat')
router.register('massage', MassageViewSets, 'massage')


urlpatterns = [
    path('', include(router.urls))
    ]
