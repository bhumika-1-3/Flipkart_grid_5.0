from django.contrib import admin

from .models import VendorProfile, Product, Coupon, UserCoupon

# Register your models here.


admin.site.register(VendorProfile)
admin.site.register(Product)
admin.site.register(Coupon)
admin.site.register(UserCoupon)