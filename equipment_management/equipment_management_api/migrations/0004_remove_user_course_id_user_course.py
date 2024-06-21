# Generated by Django 5.0 on 2024-06-21 00:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment_management_api', '0003_rename_course_user_course_id_inventory'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='course_id',
        ),
        migrations.AddField(
            model_name='user',
            name='course',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='equipment_management_api.course'),
            preserve_default=False,
        ),
    ]
