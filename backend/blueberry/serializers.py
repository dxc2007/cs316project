from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Site, Employer, WagePosting, WageBuffer, HousingPosting, HousingBuffer

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8,write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        
class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ('siteid', 'zip_code', 'city', 'state')

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = ('employerid', 'employer_name', 'industry')

class WagePostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = WagePosting
        fields = ('postingid', 'siteid', 'employerid', 'uid', 'position', 'wage', 'year')

class WageBufferSerializer(serializers.ModelSerializer):
    class Meta:
        model = WageBuffer
        fields = ('postingid', 'siteid', 'employerid', 'uid', 'position', 'wage', 'year')        

class HousingPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HousingPosting
        fields = ('postingid', 'siteid', 'price', 'year')

class HousingBufferSerializer(serializers.ModelSerializer):
    class Meta:
        model = HousingBuffer
        fields = ('postingid', 'siteid', 'price', 'year')

class HousingPostingListSerializer(serializers.ModelSerializer):
	# housingposting = serializers.PrimaryKeyRelatedField(many=True, queryset=HousingPosting.objects.all())
	housingposting = HousingPostingSerializer(many=True, read_only=True)
	
	class Meta:
		model = Site
		fields = ['siteid', 'city', 'state', 'housingposting']

class WagePostingListSerializer(serializers.ModelSerializer):
    wageposting = WagePostingSerializer(many=True, read_only=True)
    
    class Meta:
        model = Site
        fields = ['siteid', 'city', 'state', 'wageposting']