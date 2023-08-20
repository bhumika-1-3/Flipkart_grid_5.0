from django.urls import path
from .views import (
    SignUp,
    Login,
    VerifyEmail,
    LogoutAPIView,
    RequestPasswordResetEmail,
    PasswordTokenCheckAPI,
    SetNewPasswordAPIView,
    TokenBalanceAPI
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', SignUp.as_view(), name='Signup'),
    path('email-verify/', VerifyEmail.as_view(), name="EmailVerification"),
    path('login/', Login.as_view(), name="Login"),
    path('token-balance/', TokenBalanceAPI.as_view(), name="TokenBalance"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('token-refresh/',TokenRefreshView.as_view(),name="RefreshToken"),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name = "password-reset-confirm"),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(),name='password-reset-complete'),
]