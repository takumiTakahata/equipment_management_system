from django.db import models
# 学科テーブルのマイグレーション
class Course(models.Model):
    name = models.CharField('学科名', max_length=100)
    course_year = models.IntegerField('学科年')
    delete_flag = models.BooleanField('削除フラグ', default=False)

    class Meta:
        db_table = 'courses'
        verbose_name = '学科'
        verbose_name_plural = '学科'

    def __str__(self):
        return self.name