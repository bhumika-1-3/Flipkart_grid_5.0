from rest_framework import serializers
from .models import VendorProfile, Product, Coupon
from django.contrib.auth import get_user_model
User = get_user_model()

class VendorProfileSerializer(serializers.ModelSerializer):
    
    user = serializers.EmailField()
    class Meta:
        model = VendorProfile
        fields = ['user', 'vendor_tier', 'max_purchases', 'gst_number']
    
    
    def save_vendor(self, validated_data):
        user = User.objects.get(email=validated_data.get('user'))
        if user.vendor:
            #write logic here for tier
            vendor = VendorProfile.objects.create(
                                    user=user,
                                    vendor_tier=validated_data.get('vendor_tier'),
                                    max_purchases=validated_data.get('max_purchases'),
                                    gst_number=validated_data.get('gst_number')
                                    )
            vendor.save()
            return vendor
        else:
            raise serializers.ValidationError("User is not a vendor")

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['pk', 'name', 'description', 'price', 'instock', 'product_img', 'category']

class CouponSerializer(serializers.ModelSerializer):

    class Meta:
        model = Coupon
        fields = ['pk', 'name', 'code', 'discount', 'active', 'expiry_date', 'price_tokens']

class UserCouponSerializer(serializers.ModelSerializer):

    class Meta:
        model = Coupon
        fields = ['user', 'coupon', 'date_used']