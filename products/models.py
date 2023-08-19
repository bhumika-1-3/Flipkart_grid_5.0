from django.db import models

from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

User = get_user_model()
from backend.settings import factoryContract, web3
from decouple import config
from accounts.utils import Util
owner_public_key = config('OWNER_PUBLIC_KEY')
owner_private_key = config('OWNER_PRIVATE_KEY')
chain_id = config('CHAIN_ID')

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
    

@receiver(post_save, sender=VendorProfile)
def set_vendor_profile(sender, instance, **kwargs):
    products = Product.objects.filter(vendor=instance)
    weighted_avg = 0
    weighted_sum = 0
    weight = 0
    for product in products.iterator():
        weighted_sum += (product.price * product.instock)
        weight += product.instock
    if weight == 0:
        weighted_avg = 0
    else:
        weighted_avg = weighted_sum / weight
    try:
        res = Util.send_transaction(web3, factoryContract, 'issueTokensVendor', chain_id, owner_public_key, owner_private_key, instance.user.address, weighted_avg)
    except:
        raise Exception("Error in creating contract on blockchain")