from multiprocessing import AuthenticationError
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.http.response import HttpResponse, JsonResponse
import jwt
from rest_framework.views import APIView
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import (mixins, generics, status, permissions)
from rest_framework.response import Response

#reseting password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode

from backend.settings import loyaltyToken, factoryContract, web3
from decouple import config

# Create your views here.

from .utils import Util
from .serializers import (
    UserSerializer,
    EmailVerificationSerializer,
    LoginSerializer,
    ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer,
    LogoutSerializer
)
from products.models import VendorProfile

User = get_user_model()
owner_public_key = config('OWNER_PUBLIC_KEY')
owner_private_key = config('OWNER_PRIVATE_KEY')
chain_id = config('CHAIN_ID')

class SignUp(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer1 = UserSerializer(data=request.data)
        if serializer1.is_valid():
            token = serializer1.save_user(serializer1.data)
            return JsonResponse({'status': 'created', 'token': str(token)}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer1.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmail(APIView):

    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description="Enter token here")

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.verified = True
                user.active = True
                if not user.vendor:
                    try:
                        Util.send_transaction(web3, factoryContract, 'createUserContract', chain_id, owner_public_key, owner_private_key, user.address)
                        user.contract = factoryContract.functions.deployedUserContracts(user.address).call()
                    except Exception as e:
                        return JsonResponse({'error': 'Could not add user to blockchain'}, status=status.HTTP_400_BAD_REQUEST)
            user.save()
            if user.vendor:
                vendor = VendorProfile.objects.create(user=user)
            return JsonResponse({'status': 'Email Successfully Verified'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return JsonResponse({'error':"Activation Link has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return JsonResponse({'error':"Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)


class Login(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        print(validated_data['user'])
        return JsonResponse({
            'email': validated_data['user'].email,
            'vendor': validated_data['user'].vendor,
            'address': validated_data['user'].address,
            'refresh': str(validated_data['refresh']),
            'access': str(validated_data['access']),
            'spinwheel': str(validated_data['spinwheel'])
        }, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {'request': request, 'email': request.data['email']}
        serializer = self.serializer_class(data=data)
        try: 
            validated = serializer.is_valid(raise_exception=True)
            return Response({'success': 'We have sent you a link to your email to reset your password'}, status=status.HTTP_200_OK)
        except:
            raise HttpResponse({'Invalid Request': status.HTTP_401_UNAUTHORIZED})



class PasswordTokenCheckAPI(generics.GenericAPIView):

    serializer_class = ResetPasswordEmailRequestSerializer

    def get(self,request,uidb64,token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return JsonResponse({'error':'Token is not valid, please request a new one'}, status = status.HTTP_401_UNAUTHORIZED)
            return JsonResponse({'success':True,'message':'Credentials Valid','uidb64':uidb64,'token':token}, status = status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return JsonResponse({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return JsonResponse({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message':'Logged out successfully'},status=status.HTTP_204_NO_CONTENT)
    