from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Avg,Max,Min
from .serializers import SiteSerializer, EmployerSerializer, WagePostingSerializer, \
WageBufferSerializer, HousingPostingSerializer, HousingBufferSerializer, \
HousingPostingListSerializer, WagePostingListSerializer, UserSerializer, \
WageSummarySerializer, HousingSummarySerializer

from .models import Site, Employer, WagePosting, WageBuffer, HousingPosting, HousingBuffer
from rest_framework import views, viewsets          # add this
from rest_framework import generics
from rest_framework import filters
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser

from rest_framework import permissions

class IsAuthenticatedAndOwnerToUpdate(permissions.BasePermission):
    message = 'You must be the owner of this object.'
    def has_permission(self, request, view):
    	if request.method in permissions.SAFE_METHODS:
    		return True
    	return request.user and request.user.is_authenticated
    def has_object_permission(self, request, view, obj):
    	if view.action == 'retrieve':
    		return True
    	return obj.uid == request.user or request.user.is_staff

class IsAdminToUpdate(permissions.BasePermission):
    message = 'You must be admin to update this object.'
    def has_permission(self, request, view):
    	if request.method in permissions.SAFE_METHODS:
    		return True
    	return request.user.is_staff
    def has_object_permission(self, request, view, obj):
    	if view.action == 'retrieve':
    		return True
    	return request.user.is_staff

class UserCreate(views.APIView):
    """ 
    Creates the user. 
    """

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
class SiteView(viewsets.ModelViewSet):
	serializer_class = SiteSerializer
	queryset = Site.objects.all()

class EmployerView(viewsets.ModelViewSet):
	serializer_class = EmployerSerializer    
	queryset = Employer.objects.all()

class WagePostingView(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticatedAndOwnerToUpdate,)
	serializer_class = WagePostingSerializer    
	queryset = WagePosting.objects.all()

class WageBufferView(viewsets.ModelViewSet):
	permission_classes = (IsAdminUser,)
	serializer_class = WageBufferSerializer
	queryset = WageBuffer.objects.all()

class HousingPostingView(viewsets.ModelViewSet):
	permission_classes = (IsAdminToUpdate,)
	serializer_class = HousingPostingSerializer    
	queryset = HousingPosting.objects.all()

class HousingBufferView(viewsets.ModelViewSet):
	permission_classes = (IsAdminUser,)
	serializer_class = HousingBufferSerializer    
	queryset = HousingBuffer.objects.all()

class HousingPriceList(viewsets.ModelViewSet):
	permission_classes = [IsAdminToUpdate,]
	serializer_class = HousingPostingListSerializer

	def get_queryset(self):
		queryset = HousingPosting.objects.all()
		city = self.request.query_params.get('city', None)
		state = self.request.query_params.get('state', None)
		if city is not None:
			queryset = queryset.filter(siteid__city__istartswith=city)
		if state is not None:
			queryset = queryset.filter(siteid__state__istartswith=state)
		return queryset

	# def get_permissions(request):
	# 	if self.action in ['update', 'partial_update', 'destroy', 'list']:
	# 		return request.user and request.user.is_staff
	# 	elif self.action in ['create']:
	# 		return request.user and is_authenticated(request.user)
	# 	else:
	# 		return True

class WagesList(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticatedAndOwnerToUpdate,)
	serializer_class = WagePostingListSerializer

	def get_queryset(self):
		queryset = WagePosting.objects.all()
		position = self.request.query_params.get('position', None)
		city = self.request.query_params.get('city', None)
		state = self.request.query_params.get('state', None)
		if city is not None:
			queryset = queryset.filter(siteid__city__istartswith=city)
		if state is not None:
			queryset = queryset.filter(siteid__state__istartswith=state)
		if position is not None:
			queryset = queryset.filter(position__istartswith=position).distinct()
		return queryset

	# def get_permissions(request):
	# 	if self.action in ['update', 'partial_update', 'destroy', 'list']:
	# 		return request.user and request.user.is_staff
	# 	elif self.action in ['create']:
	# 		return request.user and is_authenticated(request.user)
	# 	else:
	# 		return True

class UserWagesPostingList(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class = WagePostingSerializer

	def get_queryset(self):
		user = self.request.user
		queryset = WagePosting.objects.filter(uid=user)
		return queryset

class UserWagesPendingList(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class = WageBufferSerializer

	def get_queryset(self):
		user = self.request.user
		queryset = WageBuffer.objects.filter(uid=user)
		return queryset

class WageSummaryList(viewsets.ViewSet):
	pagination_class = None

	def list(self, response):
		queryset = WagePosting.objects.all()
		position = self.request.query_params.get('position', None)
		city = self.request.query_params.get('city', None)
		state = self.request.query_params.get('state', None)
		if city is not None:
			queryset = queryset.filter(siteid__city__istartswith=city)
		if state is not None:
			queryset = queryset.filter(siteid__state__istartswith=state)
		if position is not None:
			queryset = queryset.filter(position__istartswith=position).distinct()
		result = WageSummarySerializer(queryset.aggregate(minimum=Min("wage"),maximum=Max("wage"),average=Avg("wage")))
		return Response(result.data)

class HousingSummaryList(viewsets.ViewSet):
	pagination_class = None

	def list(self, response):
		queryset = HousingPosting.objects.all()
		city = self.request.query_params.get('city', None)
		state = self.request.query_params.get('state', None)
		if city is not None:
			queryset = queryset.filter(siteid__city__istartswith=city)
		if state is not None:
			queryset = queryset.filter(siteid__state__istartswith=state)
		result = HousingSummarySerializer(queryset.aggregate(minimum=Min("price"),maximum=Max("price"),average=Avg("price")))
		return Response(result.data)