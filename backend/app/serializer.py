from rest_framework import serializers

from backend.app.models import User, Chat, Message


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    name = serializers.CharField(required=True)



    def create(self, validated_data):
        return User.objects.create_user(**validated_data)



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = [
            "id",
            "user1",
            "user2",
            "created_at",
        ]
        read_only_fields = [
            'id',
            'created_at',
        ]

        extra_kwargs = {'user2': {'write_only': True}}

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            'id',
            'user',
            'chat',
            'text',
            'created_at',
        ]
        read_only_fields = [
            'id',
            'created_at',
        ]