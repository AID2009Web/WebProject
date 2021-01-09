from django.db import models
from user.models import User

# Create your models here.
class Lesson(models.Model):
  title = models.CharField('标题', max_length=50)
  category = models.CharField('分类', max_length=20)
  limit = models.CharField('权限', max_length=10)
  introduce = models.CharField('简介', max_length=120)
  content = models.TextField('内容')
  image = models.ImageField(upload_to='lesson', null=True)
  video = models.CharField('视频外链',max_length=300)
  created_time = models.DateTimeField(auto_now_add=True)
  updated_time = models.DateTimeField(auto_now=True)
  author = models.ForeignKey(User,on_delete=models.CASCADE)
  