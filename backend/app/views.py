from django.shortcuts import render
from app.serializer import RegisterSerializer, LoginSerializer, ChatSerializer, MessageSerializer
from app.models import User, Chat, Message
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
class UserViewSets(viewsets.ViewSet):

    @action(methods=['POST'], detail=False)
    def register(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            return Response({
                'id': user.id,
                'username': user.username,
                'name': user.name,
            })

        except Exception as e:
            return Response({'message': str(e)}, status=400)

    @action(methods=['POST'], detail=False)
    def login(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = authenticate(**serializer.validated_data)
            if not user:
                return Response({
                    'message': 'user not found'
                }, status=401)

            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'id': user.id,
                'user': str(user),
                'accessToken': token.key,
            })
        except Exception as e:
            return Response({'message': str(e)}, status=400)

    @action(methods=['GET'], detail=False)
    def me(self, request):
        try:
            return Response({
                'user': request.user.id,
                'username': request.user.username,
                'name': request.user.name,
            })
        except Exception as e:
            return Response({'error': str(e)}, status=400)
    @action(methods=['GET'], detail=False)
    def all_users(self, request):
        try:
            users = User.objects.all()
            data = [{
                'id': user.id,
                'username': user.username,
                'name': user.name,
            } for user in users]

            return Response(data)

        except Exception as e:
            return Response({'message': str(e)}, status=400)

class ChatViewSets(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        try:
            chat = self.get_object()

            other_user = chat.user2 if chat.user1 == request.user else chat.user1


            serializer = ChatSerializer(chat)
            data = serializer.data

            if other_user:
                data['chat_user'] = {
                    'id': other_user.id,
                    'username': other_user.username,
                    'name': other_user.name,
                }
            else:
                data['chat_user'] = {
                    'user': 'deleted_account'
                }
            return Response(data)

        except Exception as e:
            return Response({'massage': str(e)}, status=400)


    def perform_create(self, serializer):
        return serializer.save(user1=self.request.user)

    def list(self, request, *args, **kwargs):
        try:
            chats = self.get_queryset()
            array = []

            for chat in chats:
                user = chat.user2 if chat.user1 == request.user else chat.user1

                data = ChatSerializer(chat).data

                if user:
                    data['chat_user'] = {
                        'id': user.id,
                        'username': user.username,
                        'name': user.name,
                    }
                else:
                    data['chat_user'] = {
                        'id': None,
                        'username': 'account seleted',
                        'name': None,
                    }
                array.append(data)

            return Response(array)
        except Exception as e:
            print(f"Error in list: {e}")
            return Response({'message': str(e)}, status=400)

    def get_queryset(self):
        return Chat.objects.filter(Q(user1=self.request.user) | Q(user2=self.request.user))

    @action(detail=True, methods=['POST'])
    def send_message(self, request, pk=None):
        try:
            chat = self.get_object()
            if request.user != chat.user1 and request.user != chat.user2:
                return Response({"message": "Отсутствует доступ к сайту"})

            serializer = MessageSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user, chat=chat)

            return Response(serializer.data, status=201)
        except Exception as e:
            return Response({'message': str(e)}, status=400)

    @action(methods=['GET'], detail=True)
    def get_massages(self, request, pk=None):
        try:
            chat = self.get_object()

            if request.user != chat.user1 and request.user != chat.user2:
                return Response({'message': 'Отсутствует доступ к сайту'})
            messages = Message.objects.filter(chat=chat).order_by('created_at')
            array = []
            for msg in messages:
                data = MessageSerializer(msg).data

                data['chat_user'] = {
                        'id': msg.user.id,
                        'username': msg.user.username,
                        'name': msg.user.name,
                    }
                array.append(data)
            return Response(array)

        except Exception as e:
            return Response({'message': str(e)}, status=400)