from rest_framework import serializers

from app.models import User, Chat, Message


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    name = serializers.CharField(required=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Пользователь с таким ником уже существует")
        return value

    def validate_name(self, value):
        if User.objects.filter(name=value).exists():
            raise serializers.ValidationError("Пользователь с таким именем уже существует")
        return value


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

        extra_kwargs = {'user1': {'required': False}}

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)
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

        extra_kwargs = {'user': {'required': False}, 'chat': {'required': False}}
