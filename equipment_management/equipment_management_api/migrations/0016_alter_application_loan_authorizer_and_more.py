# Generated by Django 5.0 on 2024-08-23 16:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment_management_api', '0015_application_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='loan_authorizer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='loan_authorizations', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='application',
            name='return_authorizer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='return_authorizations', to=settings.AUTH_USER_MODEL),
        ),
    ]
