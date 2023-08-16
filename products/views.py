from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import (mixins, generics, status, permissions)
from django.http.response import HttpResponse, JsonResponse

from .models import VendorProfile, Product
from .serializers import ProductSerializer

# Create your views here.

User = get_user_model()

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
    
