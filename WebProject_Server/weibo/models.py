from django.db import models

# Create your models here.
import random
def default_sign():
  signs = ['美食家','黑暗料理', '翻车', '厨神',]
  return random.choice(signs)

class WeiBo(models.Model):
    user_id = models.CharField('用户ID', max_length=30, null=False)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    nickname = models.CharField('用户昵称', max_length=30)
    avatar = models.ImageField(upload_to='avatar', null=True)
    info = models.CharField('个人简介', max_length=150, default='')
    sign = models.CharField('标签', max_length=50, default=default_sign)
    gender = models.CharField('性别', max_length=1, )
    location = models.CharField('地区', max_length=50, default='-')
    birthday = models.DateField('生日', default='2000-01-01')
