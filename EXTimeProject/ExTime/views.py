from django.db.models import Count
from django.shortcuts import render
from ExTime.serialisers  import *
from ExTime.models import *
from django.db.models import Max, Min
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import Group


@api_view(['GET'])
def get_price_limits(request, gameid):
    return Response(Service.objects.filter(game_id=gameid).aggregate(min_cost=Min('price'),max_cost = Max('price')))

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_moder(request):
    user = request.user
    return Response(user.groups.filter(name='moderators').exists())

class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    http_method_names = ['get','head']

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
    http_method_names = ['get', 'head']

    def get_queryset(self):
        queryset =  Games.objects.annotate(
            total_services=Count('services')
        ).filter(developer= self.kwargs['dev_pk'])
        return queryset


class POSTGameViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all().order_by('pk')
    serializer_class = POSTGameSerializer


# Create your views here.

class DevViewSet(viewsets.ModelViewSet):
    queryset = Developer.objects.all().order_by('pk')
    serializer_class = DevSerializer
    http_method_names = ['get', 'head']

class POSTDevViewSet(viewsets.ModelViewSet):
    queryset = Developer.objects.all().order_by('pk')
    serializer_class = DevSerializer



class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all().order_by('pk')
    serializer_class = UserSerializer
    http_method_names = ['get', 'head']

class POSTUserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    http_method_names = ['get','put', 'head']

    def get_queryset(self):
        queryset = Users.objects.all().order_by('pk')
        if self.request.method == 'PUT':
            print(self.request.data)
            seller = self.request.data.get('is_seller')
            sellerGroup = Group.objects.get(name='Seller')
            userid = list(queryset.filter(user_name=self.request.data.get('user_name')).values_list())[0][0]
            changeuser = User.objects.get(id = userid)
            print(sellerGroup, seller, userid, changeuser)
            if seller =='1' :
                sellerGroup.user_set.add(changeuser)
            else:
                sellerGroup.user_set.remove(changeuser)
        return queryset


class ServiceOfGameViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceOfGameSerializer
    http_method_names = ['get', 'head']
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
    http_method_names = ['get', 'head']

    def get_queryset(self):
        return Service.objects.filter(user=self.kwargs['user_pk'])


class POSTServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('pk')
    serializer_class = POSTServiceSerializer


class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all().order_by('pk')
    serializer_class = ReviewSerializer
    http_method_names = ['get', 'head']

    def get_queryset(self):
        return Reviews.objects.filter(serviceid=self.kwargs['service_pk'])


class POSTReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all().order_by('pk')
    serializer_class = ReviewSerializer


class SScreenViewSet(viewsets.ModelViewSet):
    queryset = Servicescreenshot.objects.all().order_by('pk')
    serializer_class = SScreenSerializer
    http_method_names = ['get', 'head']
    def get_queryset(self):
        return Servicescreenshot.objects.filter(serviceid=self.kwargs['service_pk'])

class POSTSScreenViewSet(viewsets.ModelViewSet):
    queryset = Servicescreenshot.objects.all().order_by('pk')
    serializer_class = SScreenSerializer



class STypeViewSet(viewsets.ModelViewSet):
    queryset = Servicetype.objects.all().order_by('pk')
    serializer_class = STypeSerializer
    http_method_names = ['get', 'head']

class POSTSTypeViewSet(viewsets.ModelViewSet):
    queryset = Servicetype.objects.all().order_by('pk')
    serializer_class = STypeSerializer

@api_view(['GET', 'POST'])
def setUser(request):
        if request.method == 'POST':
            user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
            myuser=Users.objects.create(user_name=request.data['username'], is_seller=request.data['is_seller'])
            customer = Group.objects.get(name='Customer')
            customer.user_set.add(user)
            print(myuser)
            myuser.save()
            user.save()
            print(request.data)
            return HttpResponse("{'status': 'ok'}")
        else:
            return HttpResponse("{'status': 'denied'}")


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request: Request):
    print(1,request.data)
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return HttpResponse(status=200)
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    print(AUserSerializer(request.user).data)
    user = Users.objects.get(pk=request.user.pk)
    print(UserSerializer(user).data)


    return Response({
        'data': AUserSerializer(request.user).data,
        'is_seller': UserSerializer(user).data
    })



class StatusViewSet(viewsets.ModelViewSet):

    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    http_method_names = ['get', 'head']


class POSTStatusViewSet(viewsets.ModelViewSet):

    queryset = Status.objects.all()
    serializer_class = StatusSerializer


class POSTCartViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Cart.objects.all()
    serializer_class = POSTCartSerializer


class POSTOrderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Order.objects.all()
    serializer_class = POSTOrderSerializer


class POSTOrderlistViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = orderlist.objects.all()
    serializer_class = POSTOrderlistSerializer


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    http_method_names = ['get', 'head']

    def get_queryset(self):
        queryset =  Cart.objects.filter(user= self.kwargs['user_pk'])
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(service=params['service'])
            except:
                pass
        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    http_method_names = ['get', 'head']

    def get_queryset(self):
        queryset =  Order.objects.filter(user = self.kwargs['user_pk'])
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(status=params['status'])
            except:
                pass
        return queryset


class OrderlistViewSet(viewsets.ModelViewSet):
    serializer_class = OrderlistSerializer
    http_method_names = ['get', 'head']

    def get_queryset(self):
        queryset = orderlist.objects.filter(order = self.kwargs['order_pk'])
        return queryset

class ALLOrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    http_method_names = ['get', 'head']

    def get_queryset(self):
        queryset = Order.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(status_id=params['status'])
            except:
                pass
        return queryset
