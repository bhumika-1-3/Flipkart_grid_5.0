# Generated by Django 3.2.20 on 2023-08-19 07:46

from django.db import migrations, models
import products.models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_img',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to=products.models.upload_path_handler),
        ),
    ]