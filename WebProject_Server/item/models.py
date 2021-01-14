from django.db import models

# Create your models here.
class Item(models.Model):
  title = models.CharField('标题', max_length=50)
  category = models.CharField('分类', max_length=20)
  content = models.TextField('内容')
  image = models.ImageField(upload_to='itemImage', null=True)
  created_time = models.DateTimeField(auto_now_add=True)
  updated_time = models.DateTimeField(auto_now=True)
  
class ItemType(models.Model):
  item = models.ForeignKey(Item, on_delete=models.CASCADE)
  type_id = models.CharField('款式ID',max_length=1,null=False)
  introduce = models.CharField('描述',max_length=10)
  price = models.DecimalField('价格',decimal_places=2,max_digits=8,default='999999.99')
  image = models.ImageField(upload_to='itemImage', null=True)