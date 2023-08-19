from django.urls import path
from .views import (
    ProductAPI,
    VendorProfileAPI,
    ProductDetailsAPI,
    IssueTokensAPI,
    CouponAPI,
    CouponDetailsAPI,
    RedeemCouponsAPI
)

urlpatterns = [
    path('vendor-profile/', VendorProfileAPI.as_view(), name="VendorProfile"),
    path('product/', ProductAPI.as_view(), name='ProductAPI'),
    path('product-detail/<int:pk>/', ProductDetailsAPI.as_view(), name='ProductDetailsAPI'),
    path('issue-tokens/', IssueTokensAPI.as_view(), name='IssueTokensAPI'),
    path('coupon/', CouponAPI.as_view(), name='CouponAPI'),
    path('coupon-details/<int:pk>/', CouponDetailsAPI.as_view(), name='CouponDetailsAPI'),
    path('redeem-coupon/', RedeemCouponsAPI.as_view(), name='RedeemCouponAPI'),
]