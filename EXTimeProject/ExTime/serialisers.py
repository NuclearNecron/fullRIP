from ExTime.models import *
from rest_framework import serializers




class DevSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer

        fields = ["pk", "dev_name", "description", "icon"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users

        fields = ["pk", "user_name","is_seller"]


#для вывода
class GameSerializer(serializers.ModelSerializer):
    developer=DevSerializer(read_only=True)
    total_services= serializers.IntegerField()
    class Meta:
        model = Games

        fields = ["pk", "game_name", "developer", "icon", "total_services"]


#ля вывода на сайт
class GameOfDevSerializer(serializers.ModelSerializer):
    total_services= serializers.IntegerField()
    class Meta:
        model = Games

        fields = ["pk", "game_name", "developer", "icon","total_services"]

#для ввода в бд
class POSTGameSerializer(serializers.ModelSerializer):

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
    user = UserSerializer(read_only=True)
    type = STypeSerializer(read_only=True)
    class Meta:
        model = Service

        fields = ["pk", "game", "service_name", "user","amount","price","description","type"]

class ServiceOfGameSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
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


class POSTServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service

        fields = ["pk", "game", "service_name", "user","amount","price","description","type"]

class POSTReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews

        fields = ["pk", "serviceid", "user_id","theme","review_text","rating",]

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Reviews

        fields = ["pk", "serviceid", "user","theme","review_text","rating",]


class SScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicescreenshot

        fields = ["pk", "serviceid", "pic_name"]


class AUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]


class LoginRequestSerializer(serializers.ModelSerializer):
    model = User
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class CartSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'


class POSTCartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = '__all__'

class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    status = StatusSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["user", "status", "cost", "id"]



class POSTOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'

class OrderlistSerializer(serializers.ModelSerializer):

    order = OrderSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = orderlist
        fields = ["order", "service", "amount", "cost", "id"]


class POSTOrderlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = orderlist
        fields = '__all__'

