# Generated by Django 3.2.20 on 2023-08-19 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_delete_vendorprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='login_consecutive',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
