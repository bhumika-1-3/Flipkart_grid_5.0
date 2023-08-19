from django.db import models

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from rest_framework_simplejwt.tokens import RefreshToken

from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in

class UserManager(BaseUserManager):

    def create_superuser(self, email, firstname, lastname, password=None, is_admin=True, is_staff=True):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.firstname = firstname
        user.lastname = lastname
        user.admin = is_admin
        user.staff = is_staff
        user.save(using=self._db)
        return user
        
    def create_staffuser(self, email, firstname, lastname, password):
        user = self.create_superuser(
            email,
            firstname,
            lastname,
            password=password
        )
        user.admin = False
        user.save(using=self._db)
        return user

    def create_user(self, email, firstname, lastname, password):
        user = self.create_superuser(
            email,
            firstname,
            lastname,
            password=password
        )
        user.staff = False
        user.admin = False
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    firstname         = models.CharField(max_length=60)
    lastname          = models.CharField(max_length=60)
    active            = models.BooleanField(default=True)
    verified          = models.BooleanField(default=False)
    staff             = models.BooleanField(default=False)
    admin             = models.BooleanField(default=False)
    vendor            = models.BooleanField(default=False)
    address           = models.CharField(max_length=255, blank=True, null=True)
    contract          = models.CharField(max_length=255, blank=True, null=True)
    login_consecutive = models.PositiveIntegerField(default=0)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['firstname', 'lastname']

    objects = UserManager()

    def __str__(self):
        return (self.firstname + " " + self.lastname)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin
    
    @property
    def is_active(self):
        return self.active
    
    @property
    def is_verified(self):
        return self.verified

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
