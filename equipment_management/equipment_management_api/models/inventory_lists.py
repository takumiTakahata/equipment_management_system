from django.db import models

# InventoryListテーブルのマイグレーション
class InventoryList(models.Model):
    inventories = models.ForeignKey('Inventory', on_delete=models.CASCADE, verbose_name='棚卸Id')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, verbose_name='備品Id')
    delete_flag = models.BooleanField('削除フラグ', db_default=False)

    class Meta:
        db_table = 'inventory_lists'
        verbose_name = '棚卸リスト'
        verbose_name_plural = '棚卸リスト'

    def __str__(self):
        return self.name