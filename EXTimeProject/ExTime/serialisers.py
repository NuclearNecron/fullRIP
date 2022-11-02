from ExTime.models import *
from rest_framework import serializers



class DevSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer

        fields = ["pk", "dev_name", "description", "icon"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ["pk", "user_name","icon" ,"email", "password","is_seller"]

class  GETUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ["pk", "user_name","icon"]

#для вывода
class GameSerializer(serializers.ModelSerializer):
    developer=DevSerializer(read_only=True)
    total_services= serializers.IntegerField()
    class Meta:
        model = Games

        fields = ["pk", "game_name", "developer", "icon","total_services"]
#ля вывода на сайт
class GameOfDevSerializer(serializers.ModelSerializer):
    total_services= serializers.IntegerField()
    class Meta:
        model = Games

        fields = ["pk", "game_name", "developer", "icon","total_services"]

#для ввода в бд
class PUTGameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Games

        fields = ["pk", "game_name", "developer", "icon"]

#для услуг сериализера
class GETGameSerializer(serializers.ModelSerializer):

    developer=DevSerializer(read_only=True)
    class Meta:
        model = Games

        fields = ["pk", "game_name", "developer", "icon"]


class STypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicetype

        fields = ["pk", "typename"]


class ServiceSerializer(serializers.ModelSerializer):

    game = GETGameSerializer(read_only=True)
    user = GETUserSerializer(read_only=True)
    type = STypeSerializer(read_only=True)
    class Meta:
        model = Service

        fields = ["pk", "game", "service_name", "user","amount","price","description","type"]

class ServiceOfGameSerializer(serializers.ModelSerializer):

    user = GETUserSerializer(read_only=True)
    type = STypeSerializer(read_only=True)
    class Meta:
        model = Service

        fields = ["pk", "game", "service_name", "user","amount","price","description","type"]

class ServiceOfUSerSerializer(serializers.ModelSerializer):

    game = GETGameSerializer(read_only=True)
    type = STypeSerializer(read_only=True)
    class Meta:
        model = Service

        fields = ["pk", "game", "service_name", "user","amount","price","description","type"]


class PUTServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service

        fields = ["pk", "game", "service_name", "user","amount","price","description","type"]

class PUTReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews

        fields = ["pk", "serviceid", "user_id","theme","review_text","rating",]

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Reviews

        fields = ["pk", "serviceid", "user","theme","review_text","rating",]

class RScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewscreenshot

        fields = ["pk", "reviewid", "pic_name"]

class SScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicescreenshot

        fields = ["pk", "serviceid", "pic_name"]

