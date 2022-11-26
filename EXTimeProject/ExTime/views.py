from django.db.models import Count
from django.shortcuts import render
from rest_framework import viewsets
from ExTime.serialisers  import *
from ExTime.models import *
from django.db.models import Max, Min
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_price_limits(request, gameid):
    return Response(Service.objects.filter(game_id=gameid).aggregate(min_cost=Min('price'),max_cost = Max('price')))


class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Games.objects.annotate(
            total_services=Count('services')
        )
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(game_name__icontains=params['name'].replace('%20', ' '))
            except:
                pass
        return queryset

class GameOfDevViewSet(viewsets.ModelViewSet):
    serializer_class = GameOfDevSerializer

    def get_queryset(self):
        queryset =  Games.objects.annotate(
            total_services=Count('services')
        ).filter(developer= self.kwargs['dev_pk'])
        return queryset
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
    serializer_class = ServiceOfGameSerializer
    def get_queryset(self):
        queryset = Service.objects.filter(game = self.kwargs['game_pk'])
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(service_name__icontains=params['name'].replace('%20', ' '))
            except:
                pass
            try:
                queryset = queryset.filter(price__gte=params['min_cost'])
            except:
                pass
            try:
                queryset = queryset.filter(price__lte=params['max_cost'])
            except:
                pass
        return queryset

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


class SScreenViewSet(viewsets.ModelViewSet):
    queryset = Servicescreenshot.objects.all().order_by('pk')
    serializer_class = SScreenSerializer
    def get_queryset(self):
        return Servicescreenshot.objects.filter(serviceid=self.kwargs['service_pk'])

class STypeViewSet(viewsets.ModelViewSet):
    queryset = Servicetype.objects.all().order_by('pk')
    serializer_class = STypeSerializer