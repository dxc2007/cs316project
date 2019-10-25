from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import SiteSerializer, EmployerSerializer, WagePostingSerializer, WageBufferSerializer, HousingPostingSerializer, HousingBufferSerializer, HousingPostingListSerializer, WagePostingListSerializer
from .models import Site, Employer, WagePosting, WageBuffer, HousingPosting, HousingBuffer
from rest_framework import generics
from rest_framework import filters

# Create your views here.
class SiteView(viewsets.ModelViewSet):
	serializer_class = SiteSerializer
	queryset = Site.objects.all()

class EmployerView(viewsets.ModelViewSet):
	serializer_class = EmployerSerializer    
	queryset = Employer.objects.all()

class WagePostingView(viewsets.ModelViewSet):
	serializer_class = WagePostingSerializer    
	queryset = WagePosting.objects.all()

class WageBufferView(viewsets.ModelViewSet):
	serializer_class = WageBufferSerializer
	queryset = WageBuffer.objects.all()

class HousingPostingView(viewsets.ModelViewSet):
	serializer_class = HousingPostingSerializer    
	queryset = HousingPosting.objects.all()

class HousingBufferView(viewsets.ModelViewSet):
	serializer_class = HousingBufferSerializer    
	queryset = HousingBuffer.objects.all()

class HousingPriceList(viewsets.ModelViewSet):
	serializer_class = HousingPostingListSerializer

	def get_queryset(self):
		queryset = Site.objects.all()
		city = self.request.query_params.get('city', None)
		state = self.request.query_params.get('state', None)
		if city is not None:
			queryset = queryset.filter(city__istartswith=city)
		if state is not None:
			queryset = queryset.filter(state__istartswith=state)
		return queryset

class WagesList(viewsets.ModelViewSet):
	serializer_class = WagePostingListSerializer

	def get_queryset(self):
		queryset = Site.objects.all()
		position = self.request.query_params.get('position', None)
		city = self.request.query_params.get('city', None)
		state = self.request.query_params.get('state', None)
		if city is not None:
			queryset = queryset.filter(city__istartswith=city)
		if state is not None:
			queryset = queryset.filter(state__istartswith=state)
		if position is not None:
			queryset = queryset.filter(wageposting__position__istartswith=position).distinct()
		return queryset