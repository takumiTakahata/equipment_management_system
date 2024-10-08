# Generated by Django 5.0 on 2024-08-20 14:11

from django.db import migrations
import datetime

def copy_deadline_data(apps, schema_editor):
    Product = apps.get_model('equipment_management_api', 'Product')
    for product in Product.objects.all():
        if product.deadline_date:
            product.deadline_temp = (product.deadline_date - datetime.date(1970, 1, 1)).days
            product.save()

class Migration(migrations.Migration):

    dependencies = [
        ('equipment_management_api', '0009_remove_product_deadline_product_deadline_date_and_more'),
    ]

    operations = [
        migrations.RunPython(copy_deadline_data),
    ]
