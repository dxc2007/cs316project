from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import SiteSerializer, EmployerSerializer, WagePostingSerializer, \
WageBufferSerializer, HousingPostingSerializer, HousingBufferSerializer, \
HousingPostingListSerializer, WagePostingListSerializer, UserSerializer

from .models import Site, Employer, WagePosting, WageBuffer, HousingPosting, HousingBuffer
from rest_framework import views, viewsets          # add this
from rest_framework import generics
from rest_framework import filters
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
# from rest_auth.registration.views import SocialLoginView


# class FacebookLogin(SocialLoginView):
#     adapter_class = FacebookOAuth2Adapter

# class GithubLogin(SocialLoginView):
#     adapter_class = GitHubOAuth2Adapter
#     callback_url = CALLBACK_URL_YOU_SET_ON_GITHUB
#     client_class = OAuth2Client

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

	# def get_permissions(request):
	# 	if self.action in ['update', 'partial_update', 'destroy', 'list']:
	# 		return request.user and request.user.is_staff
	# 	elif self.action in ['create']:
	# 		return request.user and is_authenticated(request.user)
	# 	else:
	# 		return True

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

class UserHousingPostingList(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class = HousingPostingSerializer

	def get_queryset(self):
		user = self.request.user
		queryset = HousingPosting.objects.filter(uid=user)
		return queryset

