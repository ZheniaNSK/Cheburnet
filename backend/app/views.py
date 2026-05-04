from django.shortcuts import render
from backend.app.serializer import RegisterSerializer, LoginSerializer, ChatSerializer, MessageSerializer
from backend.app.models import User, Chat, Message
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

class UserViewSets(viewsets.ViewSet):

    @action(methods=['POST'], detail=False)
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': user.id,
            'username': user.username,
            'name': user.name,
        })

    @action(methods=['POST'], detail=False)
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(**serializer.validated_data)
        if not user:
            return Response({
                'error': 'user not found'
            }, status=401)

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'user': str(user),
            'accessToken': token.key,
        })

    @action(methods=['GET'], detail=False)
    def me(self, request):
        return Response({
            'user': request.user.id,
            'username': request.user.username,
            'name': request.user.name,
        })





class ChatViewSets(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        return serializer.save(user1=self.request.user)

    def list(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            objs = Chat.objects.all().filter(user1=request.user) or Chat.objects.all().filter(user2=request.user)
        return Response(ChatSerializer(objs, many=True).data)

class MassageViewSets(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
