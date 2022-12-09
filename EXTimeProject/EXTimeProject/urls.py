"""EXTimeProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,path
from ExTime import views as ExTime_views
from rest_framework_nested import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.SimpleRouter()
router.register(r'games', ExTime_views.GameViewSet, basename='all games') #главная
router.register(r'dev', ExTime_views.DevViewSet, basename='dev') #разраб
router.register(r'users', ExTime_views.UserViewSet, basename='users') #user
router.register(r'POSTusers', ExTime_views.POSTUserViewSet, basename='POST users')
router.register(r'stype', ExTime_views.STypeViewSet, basename='stype') #типы, подставляется, без страницы
router.register(r'POSTstype', ExTime_views.POSTSTypeViewSet, basename='POST type')
router.register(r'POSTgames', ExTime_views.POSTGameViewSet, basename='POST games')#pure
router.register(r'POSTdev', ExTime_views.POSTDevViewSet, basename='POST dev')
router.register(r'POSTservice', ExTime_views.POSTServiceViewSet, basename='POST service') #pure
router.register(r'POSTreviews', ExTime_views.POSTReviewsViewSet, basename='POST reviews') #pure
router.register(r'POSTpicture', ExTime_views.POSTSScreenViewSet, basename='POST picture')
router.register(r'POSTorderlist', ExTime_views.POSTOrderlistViewSet, basename='POST orderlist')
router.register(r'POSTorder', ExTime_views.POSTOrderViewSet, basename='POST order')
router.register(r'POSTcart', ExTime_views.POSTCartViewSet, basename='POST cart')
router.register(r'status', ExTime_views.StatusViewSet, basename='status')
router.register(r'POSTstatus', ExTime_views.POSTStatusViewSet, basename='POST status')
router.register(r'Allorder', ExTime_views.ALLOrderViewSet, basename='All order')

dev_router = routers.NestedSimpleRouter(router, r'dev', lookup='dev')
dev_router.register(r'games', ExTime_views.GameOfDevViewSet, basename='games of dev') #разраб

game_router = routers.NestedSimpleRouter(router, r'games', lookup='game')
game_router.register(r'services', ExTime_views.ServiceOfGameViewSet, basename='services of game')

service_router = routers.NestedSimpleRouter(game_router,r'services',lookup='service')
service_router.register(r'reviews',ExTime_views.ReviewsViewSet, basename='reviews of service')
service_router.register(r'picture',ExTime_views.SScreenViewSet, basename='picture of service')

user_router = routers.NestedSimpleRouter(router, r'users',lookup='user')
user_router.register(r'services',ExTime_views.ServiceOfUserViewSet,basename='services of user')
user_router.register(r'cart',ExTime_views.CartViewSet,basename='cart of user')
user_router.register(r'order',ExTime_views.OrderViewSet,basename='orders of user')

order_router = routers.NestedSimpleRouter(user_router, r'order',lookup='order')
order_router.register(r'orderlist',ExTime_views.OrderlistViewSet,basename='items of order')


urlpatterns = [
    path('', include(router.urls)),
    path('',include(dev_router.urls)),
    path('',include(game_router.urls)),
    path('',include(service_router.urls)),
    path('',include(user_router.urls)),
    path('',include(order_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('ismod/', ExTime_views.get_moder, name = 'is moderator'),
    path('servprice/<int:gameid>',ExTime_views.get_price_limits),
    path('add_user', ExTime_views.setUser, name='setUser'),
    path('api/user', ExTime_views.user, name='user'),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
