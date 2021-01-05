from django.db import models
from user.models import User

# Create your models here.
class Topic(models.Model):
  limit = models.CharField('权限', max_length=10)
  content = models.TextField('内容')
  created_time = models.DateTimeField(auto_now_add=True)
  updated_time = models.DateTimeField(auto_now=True)
  author = models.ForeignKey(User,on_delete=models.CASCADE)