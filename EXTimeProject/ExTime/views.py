from django.db.models import Count
from django.shortcuts import render
from rest_framework import viewsets

from ExTime.serialisers  import *
from ExTime.models import *


class GameViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all().order_by('pk')
    serializer_class = GameSerializer

    def get_queryset(self):
        return Games.objects.annotate(
            total_services=Count('services')
        )

class GameOfDevViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all().order_by('pk')
    serializer_class = GameOfDevSerializer

    def get_queryset(self):
        return Games.objects.annotate(
            total_services=Count('services')
        ).filter(developer= self.kwargs['dev_pk'])
class PUTGameViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all().order_by('pk')
    serializer_class = PUTGameSerializer


# Create your views here.

class DevViewSet(viewsets.ModelViewSet):
    queryset = Developer.objects.all().order_by('pk')
    serializer_class = DevSerializer





class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('pk')
    serializer_class = UserSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('pk')
    serializer_class = ServiceSerializer

class ServiceOfGameViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('pk')
    serializer_class = ServiceOfGameSerializer
    def get_queryset(self):
        return Service.objects.filter(game = self.kwargs['game_pk'])

class ServiceOfUserViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('pk')
    serializer_class = ServiceOfGameSerializer

    def get_queryset(self):
        return Service.objects.filter(user=self.kwargs['user_pk'])
class PUTServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('pk')
    serializer_class = PUTServiceSerializer

class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all().order_by('pk')
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Reviews.objects.filter(serviceid=self.kwargs['service_pk'])

class PUTReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all().order_by('pk')
    serializer_class = ReviewSerializer

class RScreenViewSet(viewsets.ModelViewSet):
    queryset = Reviewscreenshot.objects.all().order_by('pk')
    serializer_class = RScreenSerializer
    def get_queryset(self):
        return Reviewscreenshot.objects.filter(reviewid=self.kwargs['review_pk'])

class SScreenViewSet(viewsets.ModelViewSet):
    queryset = Servicescreenshot.objects.all().order_by('pk')
    serializer_class = SScreenSerializer
    def get_queryset(self):
        return Servicescreenshot.objects.filter(serviceid=self.kwargs['service_pk'])

class STypeViewSet(viewsets.ModelViewSet):
    queryset = Servicetype.objects.all().order_by('pk')
    serializer_class = STypeSerializer