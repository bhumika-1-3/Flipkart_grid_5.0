from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
# for reseting password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str, smart_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.urls import reverse

from .utils import Util
from django.conf import settings
from django.utils.timezone import localtime
from datetime import datetime as dt, timedelta as td

from backend.settings import loyaltyToken, factoryContract, web3
from decouple import config

User = get_user_model()
owner_public_key = config('OWNER_PUBLIC_KEY')
owner_private_key = config('OWNER_PRIVATE_KEY')
chain_id = config('CHAIN_ID')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'firstname', 'lastname', 'vendor', 'address', 'contract']
    
    def save_user(self, validated_data):
        user = User.objects.create_user( 
                                password=validated_data.get('password'), 
                                email=validated_data.get('email'),
                                firstname=validated_data.get('firstname'),
                                lastname=validated_data.get('lastname')
                                )
        user.vendor = validated_data.get('vendor')
        user.address = validated_data.get('address')
        user.save()
        token = RefreshToken.for_user(user).access_token
        relative_link = reverse('EmailVerification')
        abs_url = settings.FRONT_END_HOST + relative_link + "user-id=" + str(token)
        email_body = "Hiii"+ user.firstname + " " + user.lastname + "! Use link below to verify your email \n"+ abs_url
        data ={'email_body': email_body, 'email_subject': "Verify your Email",'to_email':user.email}
        Util.send_email(data)
        return token


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=666)

    class Meta:
        model = User
        fields = ['token']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=3)
    tokens = serializers.CharField(max_length=68, min_length=8, read_only=True)

    class Meta:
        model=User
        fields = ['email', 'password', 'tokens']

    def validate(self, attrs):

        email = attrs.get('email','')
        password = attrs.get('password', '')

        filtered_user_by_email = User.objects.filter(email=email)
        auth_user = auth.authenticate(email=email, password=password)
        print(auth_user.last_login.date())
        print(localtime().date())
        delta = localtime().date() - auth_user.last_login.date()
        spin_wheel = False
        if delta.days == 1:
            user_address = web3.to_checksum_address(auth_user.address)
            if auth_user.login_consecutive == 6:
                spin_wheel = True
                print("Tokens issued for 7 days regular login")
            else:
                Util.send_transaction(web3, factoryContract, "issueTokensUser", chain_id, owner_public_key, owner_private_key, user_address, 1)
                print("Tokens issued for 7 days regular login")
        auth_user.last_login = localtime()
        auth_user.save()
        if not auth_user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not auth_user.is_active:
            raise AuthenticationFailed("Account Disabled, contact admin")
        if not auth_user.is_verified:
            raise AuthenticationFailed("Email not verified yet")

        tokens = RefreshToken.for_user(user=auth_user)
        return {
            'user': auth_user,
            'refresh': str(tokens),
            'access': str(tokens.access_token),
            'spinwheel': spin_wheel
        }


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    # redirect_url = serializers.CharField(max_length=500, required=False)
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs['email']
        print(email)
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            #hashing the user id 
            token=PasswordResetTokenGenerator().make_token(user) 
            #this token becomes invalid once the user has reset the password
            relative_link = reverse('password-reset-confirm',kwargs={'uidb64':uidb64,'token':token})
            abs_url = settings.FRONT_END_HOST + relative_link
            email_body = "Hiii! Use link below to reset your password \n"+ abs_url
            data ={'email_body': email_body, 'email_subject': "reset your password",'to_email':user.email}
            Util.send_email(data)
        
        return super().validate(attrs)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            user.set_password(password)
            user.save()
            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')