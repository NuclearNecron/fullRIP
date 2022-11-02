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

router = routers.DefaultRouter()
router.register(r'games', ExTime_views.GameViewSet, basename='all games') #главная
router.register(r'dev', ExTime_views.DevViewSet) #разраб
router.register(r'users', ExTime_views.UserViewSet) #user
#router.register(r'service', ExTime_views.ServiceViewSet)
#router.register(r'RScreen', ExTime_views.RScreenViewSet)
#router.register(r'SScreen', ExTime_views.SScreenViewSet)
router.register(r'stype', ExTime_views.STypeViewSet) #типы, подставляется, без страницы
router.register(r'PUTGames', ExTime_views.PUTGameViewSet) #pure
router.register(r'PUTService', ExTime_views.PUTServiceViewSet) #pure
router.register(r'PUTreviews', ExTime_views.PUTReviewsViewSet) #pure

dev_router = routers.NestedDefaultRouter(router, r'dev', lookup='dev')
dev_router.register(r'games', ExTime_views.GameOfDevViewSet, basename='games of dev') #разраб

game_router = routers.NestedSimpleRouter(router, r'games', lookup='game')
game_router.register(r'services', ExTime_views.ServiceOfGameViewSet, basename='services of game') # услуги

service_router = routers.NestedSimpleRouter(game_router,r'services',lookup='service')
service_router.register(r'reviews',ExTime_views.ReviewsViewSet, basename='reviews of service')
service_router.register(r'picture',ExTime_views.SScreenViewSet, basename='picture of service')

user_router = routers.NestedSimpleRouter(router, r'users',lookup='user')
user_router.register(r'services',ExTime_views.ServiceOfUserViewSet,basename='services of user')

review_router = routers.NestedSimpleRouter(service_router,r'reviews',lookup='review')
review_router.register(r'picture',ExTime_views.RScreenViewSet,basename='picture of review')

urlpatterns = [
    path('', include(router.urls)),
    path('',include(dev_router.urls)),
    path('',include(game_router.urls)),
    path('',include(service_router.urls)),
    path('',include(user_router.urls)),
    path('',include(review_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
