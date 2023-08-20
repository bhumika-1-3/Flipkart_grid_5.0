from django.urls import path
from .views import (
    ProductAPI,
    VendorProfileAPI,
    ProductDetailsAPI,
    CouponAPI,
    CouponDetailsAPI,
    RedeemCouponsAPI,
    ProductListAPI
)

urlpatterns = [
    path('vendor-profile/', VendorProfileAPI.as_view(), name="VendorProfile"),
    path('product/', ProductAPI.as_view(), name='ProductAPI'),
    path('all-products/', ProductListAPI.as_view(), name='AllProductsAPI'),
    path('product-detail/<int:pk>/', ProductDetailsAPI.as_view(), name='ProductDetailsAPI'),
    path('coupon/', CouponAPI.as_view(), name='CouponAPI'),
    path('coupon-details/<int:pk>/', CouponDetailsAPI.as_view(), name='CouponDetailsAPI'),
    path('redeem-coupon/', RedeemCouponsAPI.as_view(), name='RedeemCouponAPI'),
]