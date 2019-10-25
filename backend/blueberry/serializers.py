from rest_framework import serializers
from .models import Site, Employer, WagePosting, WageBuffer, HousingPosting, HousingBuffer

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
        fields = ('postingid', 'siteid', 'uid', 'price', 'year')

class HousingBufferSerializer(serializers.ModelSerializer):
    class Meta:
        model = HousingBuffer
        fields = ('postingid', 'siteid', 'uid', 'price', 'year')

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