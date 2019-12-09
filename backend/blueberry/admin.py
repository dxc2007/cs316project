from django.contrib import admin
from .models import Site, Employer, WagePosting, WageBuffer, HousingPosting, HousingBuffer

# Register your models here.

class SiteAdmin(admin.ModelAdmin):
    list_display = ('siteid', 'zip_code', 'city', 'state')

class EmployerAdmin(admin.ModelAdmin):
    list_display = ('employerid', 'employer_name', 'industry')

class WagePostingAdmin(admin.ModelAdmin):
    list_display = ('postingid','siteid', 'employerid', 'uid', 'position', 'wage', 'year')

class WageBufferAdmin(admin.ModelAdmin):
    list_display = ('postingid', 'siteid', 'employerid', 'uid', 'position', 'wage', 'year')        

class HousingPostingAdmin(admin.ModelAdmin):
    list_display = ('postingid', 'siteid', 'price', 'year')

class HousingBufferAdmin(admin.ModelAdmin):
    list_display = ('postingid', 'siteid', 'price', 'year')

# Register your models here.
admin.site.register(Site, SiteAdmin)
admin.site.register(Employer, EmployerAdmin)
admin.site.register(WagePosting, WagePostingAdmin)
admin.site.register(WageBuffer, WageBufferAdmin)
admin.site.register(HousingPosting, HousingPostingAdmin)
admin.site.register(HousingBuffer, HousingBufferAdmin)