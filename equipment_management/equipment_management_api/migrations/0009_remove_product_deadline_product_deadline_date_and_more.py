# Generated by Django 5.0 on 2024-08-20 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment_management_api', '0008_merge_20240717_0944'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='deadline',
        ),
        migrations.AddField(
            model_name='product',
            name='deadline_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='deadline_temp',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
