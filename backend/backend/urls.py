"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django_filters.views import FilterView

from blueberry import views as blueberry_views

router = routers.DefaultRouter()
router.register(r'sites', blueberry_views.SiteView, 'site')
router.register(r'employers', blueberry_views.EmployerView, 'employer')
router.register(r'wagepostings', blueberry_views.WagePostingView, 'wageposting')
router.register(r'wagebuffers', blueberry_views.WageBufferView, 'wagebuffer')
router.register(r'housingpostings', blueberry_views.HousingPostingView, 'housingposting')
router.register(r'housingbuffers', blueberry_views.HousingBufferView, 'housingbuffer')
router.register(r'housingprices', blueberry_views.HousingPriceList, 'housingprice')
router.register(r'wages', blueberry_views.WagesList, 'wage')
router.register(r'userwagepostings', blueberry_views.UserWagesPostingList, 'userwageposting')
router.register(r'userhousingpostings', blueberry_views.UserHousingPostingList, 'userhousingposting')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token, name="api-token-auth"),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/create-user/', blueberry_views.UserCreate.as_view(),name='create_user'),
    # path('rest-auth/facebook/', blueberry_views.FacebookLogin.as_view(), name='fb_login')
    # path('rest-auth/github/', GitHubLogin.as_view(), name='github_login')
]