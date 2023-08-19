from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import (mixins, generics, status, permissions)
from django.http.response import HttpResponse, JsonResponse

from .models import VendorProfile, Product, Coupon, UserCoupon
from .serializers import ProductSerializer, VendorProfileSerializer, CouponSerializer

# Create your views here.

import math
from datetime import date as dt

User = get_user_model()
from backend.settings import factoryContract, web3
from decouple import config
from accounts.utils import Util
owner_public_key = config('OWNER_PUBLIC_KEY')
owner_private_key = config('OWNER_PRIVATE_KEY')
chain_id = config('CHAIN_ID')

#Vendor APIs
class VendorProfileAPI(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    serializer_class = VendorProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        if user.vendor:
            vendor = VendorProfile.objects.get(user=user.pk)
            vendor.max_purchases = request.data['max_purchases']
            vendor.gst_number = request.data['gst_number']
            vendor.save()
        else:
            return JsonResponse({'error': 'User is not a vendor'}, status=status.HTTP_400_BAD_REQUEST)
        
class IssueTokensAPI(generics.GenericAPIView):
    serializer_class = VendorProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        if user.vendor:
            instance = VendorProfile.objects.get(user=user.pk)
            products = Product.objects.filter(vendor=instance.pk)
            if len(products) > 0:
                weighted_avg = 0
                weighted_sum = 0
                weight = 0
                for product in products.iterator():
                    weighted_sum += (product.price * product.instock)
                    weight += product.instock
                if weight == 0:
                    weighted_avg = 0
                else:
                    weighted_avg = weighted_sum / weight
                try:
                    final_token_count = math.floor(weighted_avg/100)
                    res = Util.send_transaction(web3, factoryContract, 'issueTokensVendor', chain_id, owner_public_key, owner_private_key, instance.user.address, final_token_count)
                except Exception as e:
                    raise Exception("Error in creating contract on blockchain")
            return JsonResponse({'status': 'Tokens issued'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'User is not a vendor'}, status=status.HTTP_400_BAD_REQUEST)

class ProductAPI(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):

    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        try:
            user = self.request.user
            vendor = VendorProfile.objects.get(user=user.pk)
            queryset = Product.objects.filter(vendor=vendor.pk)
            return queryset
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        user = request.user
        vendor = VendorProfile.objects.get(user=user.pk)
        try:
            product = Product.objects.create(
                vendor=vendor,
                name=request.data['name'],
                description=request.data['description'],
                price=request.data['price'],
                instock=request.data['instock'],
                product_img=request.data['product_img'],
                category=request.data['category']
            )
            return JsonResponse({'status': 'created'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class ProductDetailsAPI(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        try:
            user = self.request.user
            vendor = VendorProfile.objects.get(user=user.pk)
            queryset = Product.objects.filter(vendor=vendor.pk)
            return queryset
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class CouponAPI(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):

    serializer_class = CouponSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        try:
            user = self.request.user
            vendor = VendorProfile.objects.get(user=user.pk)
            queryset = Coupon.objects.filter(vendor=vendor.pk, active=True, expiry_date__gte=dt.today())
            return queryset
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        user = request.user
        vendor = VendorProfile.objects.get(user=user.pk)
        try:
            coupon = Coupon.objects.create(
                vendor=vendor,
                name=request.data['name'],
                code=request.data['code'],
                discount=request.data['discount'],
                expiry_date=request.data['expiry_date'],
                price_tokens=request.data['price_tokens'],
                active=True
            )
            return JsonResponse({'status': 'created'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class CouponDetailsAPI(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    serializer_class = CouponSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        try:
            user = self.request.user
            vendor = VendorProfile.objects.get(user=user.pk)
            queryset = Coupon.objects.filter(vendor=vendor.pk)
            return queryset
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class RedeemCouponsAPI(mixins.CreateModelMixin, mixins.ListModelMixin, generics.GenericAPIView):

    serializer_class = CouponSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        usercoupons = UserCoupon.objects.filter(user=self.request.user.pk)
        coupons = Coupon.objects.filter(pk__in=usercoupons.values_list('coupon', flat=True))
        return Coupon.objects.all().exclude(pk__in=coupons.values_list('pk', flat=True))

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            coupon = Coupon.objects.get(code=request.data['code'])
            user_coupon = UserCoupon.objects.create(
                user=user,
                coupon=coupon
            )
            return JsonResponse({'status': 'created'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)