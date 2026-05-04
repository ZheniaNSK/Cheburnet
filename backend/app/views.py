from django.shortcuts import render
from app.serializer import RegisterSerializer, LoginSerializer
from app.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token

class UserViewSets(viewsets.ViewSet):

    @action(methods=['POST'], detail=False)
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': user.id,
            'username': user.username,
            'password': user.password
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
            'token': token.key,
        })
