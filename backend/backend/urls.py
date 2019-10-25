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
from django.urls import path, include
from rest_framework import routers
from django_filters.views import FilterView

from todo import views as todo_views
from blueberry import views as blueberry_views

router = routers.DefaultRouter()
router.register(r'todos', todo_views.TodoView, 'todo')
router.register(r'sites', blueberry_views.SiteView, 'site')
router.register(r'employers', blueberry_views.EmployerView, 'employer')
router.register(r'wagepostings', blueberry_views.WagePostingView, 'wageposting')
router.register(r'wagebuffers', blueberry_views.WageBufferView, 'wagebuffer')
router.register(r'housingpostings', blueberry_views.HousingPostingView, 'housingposting')
router.register(r'housingbuffers', blueberry_views.HousingBufferView, 'housingbuffer')
router.register(r'housingprices', blueberry_views.HousingPriceList, 'housingprice')
router.register(r'wages', blueberry_views.WagesList, 'wage')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]