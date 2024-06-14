# Generated by Django 5.0 on 2024-06-13 01:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=64)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
                'db_table': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='学科名')),
                ('course_year', models.IntegerField(verbose_name='学科年')),
                ('delete_flag', models.BooleanField(db_default=models.Value(False), verbose_name='削除フラグ')),
            ],
            options={
                'verbose_name': '学科',
                'verbose_name_plural': '学科',
                'db_table': 'courses',
            },
        ),
    ]
