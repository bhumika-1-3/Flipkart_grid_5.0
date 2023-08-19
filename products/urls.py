from django.urls import path
from .views import ProductAPI, VendorProfileAPI

urlpatterns = [
    path('vendor-profile/', VendorProfileAPI.as_view(), name="VendorProfile"),
    path('product/', ProductAPI.as_view(), name='ProductAPI')
]