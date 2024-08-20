from django.db import models
from .categories import Category

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    categories = models.ForeignKey('Category', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    deadline = models.IntegerField(null=False,default=0)
    ISBN = models.CharField(max_length=16, unique=True, null=True)
    lost_status = models.BooleanField(db_default=False)
    active_flag = models.BooleanField(db_default=True)
    delete_flag = models.BooleanField(db_default=False)

    class Meta:
        db_table = 'products'
        verbose_name = '備品'
        verbose_name_plural = '備品'

    def __str__(self):
        return self.name
