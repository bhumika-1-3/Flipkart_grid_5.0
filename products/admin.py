from django.contrib import admin

from .models import VendorProfile, Product

# Register your models here.


admin.site.register(VendorProfile)
admin.site.register(Product)