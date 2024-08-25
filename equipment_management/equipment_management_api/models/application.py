from django.db import models
from .users import User
from .products import Product

class Application(models.Model):
  user = models.ForeignKey(User, related_name='applications', on_delete=models.CASCADE)
  product = models.ForeignKey('Product',on_delete=models.CASCADE)
  thread_key = models.CharField(max_length=255)
  loan_authorizer = models.ForeignKey(User, related_name='loan_authorizations', on_delete=models.CASCADE, null=True)
  return_authorizer = models.ForeignKey(User, related_name='return_authorizations', on_delete=models.CASCADE, null=True)
  loan_date = models.DateField(null=True)
  return_date = models.DateField(null=True)
  deadline = models.DateField(null=True)
  delete_flag = models.BooleanField(default=False)

  class Meta:
    db_table = 'application'
    verbose_name = '申請'
    verbose_name_plural = '申請'

  def __str__(self):
    return self.name
