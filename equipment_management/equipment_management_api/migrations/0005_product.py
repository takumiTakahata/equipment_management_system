# Generated by Django 5.0 on 2024-06-24 04:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment_management_api', '0004_remove_user_course_id_user_course'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('deadline', models.DateField()),
                ('ISBN', models.CharField(max_length=16, unique=True)),
                ('lost_status', models.BooleanField(db_default=models.Value(False))),
                ('active_flag', models.BooleanField(db_default=models.Value(True))),
                ('delete_flag', models.BooleanField(db_default=models.Value(False))),
                ('categories', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='equipment_management_api.category')),
            ],
            options={
                'verbose_name': '備品',
                'verbose_name_plural': '備品',
                'db_table': 'products',
            },
        ),
    ]