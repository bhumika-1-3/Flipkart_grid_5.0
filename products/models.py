from django.db import models

from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

User = get_user_model()

# Create your models here.

def upload_path_handler(instance, filename):
    return "images/products/{file}".format(
        file=str(instance.name+filename)
    )

class VendorProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    vendor_tier = models.PositiveIntegerField(blank=True, null=True)
    max_purchases = models.PositiveIntegerField(blank=True, null=True)
    gst_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.user.firstname + " " + self.user.lastname
    

class Product(models.Model):
    Cats = (
        ('Elec', 'Electronics'),
        ('MCol', "Men's Fashion"),
        ('FCol', "Women's Fashion"),
    )
    name        = models.CharField(max_length=225)
    vendor      = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price       = models.DecimalField(decimal_places=2, max_digits=10)
    instock     = models.IntegerField(default=0)
    product_img = models.ImageField(default='default.jpg', upload_to=upload_path_handler, blank=True, null=True)
    category    = models.CharField(max_length=100, choices=Cats, blank=True, null=True)

    def __str__(self):
        return self.name