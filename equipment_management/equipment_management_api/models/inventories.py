from django.db import models
from .users import User
import datetime
# 棚卸テーブルのマイグレーション
t_delta = datetime.timedelta(hours=9)
JST = datetime.timezone(t_delta, 'JST')
now = datetime.datetime.now(JST)

class Inventory(models.Model):
    teacher = models.ForeignKey("User", on_delete=models.CASCADE,)
    day = models.DateField('実施日',auto_now_add=True)
    delete_flag = models.BooleanField('削除フラグ', default=False)

    class Meta:
        db_table = 'inventories'
        verbose_name = '棚卸'
        verbose_name_plural = '棚卸'

    def __str__(self):
        return f"{self.teacher.name} - {self.day}"
    
