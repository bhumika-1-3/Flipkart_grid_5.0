from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import (mixins, generics, status, permissions)
from django.http.response import HttpResponse, JsonResponse

from .models import VendorProfile, Product
from .serializers import ProductSerializer, VendorProfileSerializer

# Create your views here.

User = get_user_model()

#Vendor APIs
class VendorProfileAPI(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    serializer_class = VendorProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        if user.vendor:
            vendor = VendorProfile.objects.get(user=user)
            vendor.max_purchases = request.data['max_purchases']
            vendor.gst_number = request.data['gst_number']
            vendor.save()
        else:
            return JsonResponse({'error': 'User is not a vendor'}, status=status.HTTP_400_BAD_REQUEST)

class ProductAPI(mixins.CreateModelMixin, generics.GenericAPIView):

    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        vendor = VendorProfile.objects.get(user=user)
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
    
