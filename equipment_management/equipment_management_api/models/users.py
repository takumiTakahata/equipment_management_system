from django.db import models
from django.contrib.auth.models import AbstractUser
from .courses import Course

class User(AbstractUser):
  course = models.ForeignKey("Course",on_delete=models.CASCADE)
  school_year = models.IntegerField('学年',null=True)
  email = models.EmailField('メールアドレス', unique=True)
  admin_flag = models.BooleanField('管理者フラグ', default=False)
  delete_flag = models.BooleanField('削除フラグ', default=False)

  class Meta:
    db_table = 'user'
    verbose_name = 'User'
    verbose_name_plural = 'Users'

  def __str__(self):
    return self.username
