from django.db import models
from accounts.models import VendorProfile

# Create your models here.
    
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
    product_img = models.ImageField(default='default.jpg', upload_to='image/', blank=True, null=True)
    category    = models.CharField(max_length=100, choices=Cats, blank=True, null=True)

    def __str__(self):
        return self.name