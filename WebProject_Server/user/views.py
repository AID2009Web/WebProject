from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.core.cache import cache
from django.conf import settings
from django.utils.decorators import method_decorator

import json
import re
import random
import time
import jwt
import hashlib

from user.models import User0
from tools.sms import YunTongXin
from tools.login_dec import login_check

# Create your views here.
class UsersView(View):
  def get(self, request, user_id=None):
    if user_id:
      try:
        user = User0.objects.get(user_id=user_id)
      except:
        result = {'code': 10108, 'error': '用户名不存在'}
        return JsonResponse(result)
      
      if request.GET.keys():
        data = {}
        for k in request.GET.keys():
          if k == 'pwd':
            continue
          if hasattr(user, k):
            data[k] = getattr(user, k)

        result = {'code': 200, 'user_id': user_id, 'data':data}
      else:
        result = {'code': 200, 'user_id': user_id, 'data': {
          'id': user.id, 'user_id': user.user_id, 'nickname': user.nickname,
          'info': user.info, 'sign': user.sign, 'gender': user.gender,
          'location': user.location, 'birthday': user.birthday,
          'avatar': str(user.avatar)
        }}
        return JsonResponse(result)
    else:
      pass
    return HttpResponse('user get')

  def post(self, request):
    
    json_str =request.body
    py_obj = json.loads(json_str)
    if py_obj=={}:
      return JsonResponse({'code': 10100, 'error': '请求无内容'})

    py_obj = json.loads(json_str)
    user_id = py_obj['user_id']
    pwd = py_obj['pwd']
    sms = py_obj['sms']
    
    print(py_obj)

    reg = '^1[0-9]{10}$'
    if not user_id:
      return JsonResponse({'code': 10101, 'error': '请输入手机号'})
    elif not re.match(reg, user_id):
      return JsonResponse({'code': 10104, 'error': '手机号格式不正确'})

    if (not sms) & (not pwd):
      return JsonResponse({'code': 10100, 'error': '请求无内容'})
    if sms:
      cache_key = 'sms_%s' % user_id
      cache_code = cache.get(cache_key)
      if not cache_code:
        result = {'code': 10105, 'error': '验证码已过期'}
        return JsonResponse(result)
      if int(sms) != cache_code:
        result = {'code': 10106, 'error': '验证码输入错误'} 
        return JsonResponse(result)
        
    
    # if pwd:
    #   try:
    #     user = User0.objects.get(user_id=user_id)
    #   except:
    #     result = {'code':10105, 'error':'用户或密码错误'}
    #     return JsonResponse(result)
    #   old_user = User0.objects.filter(user_id=user_id)
    # else:
    #   try:
    #     user = User0.objects.create(user_id=user_id)
    #   except:
    md5 = hashlib.md5()
    md5.update(pwd.encode())
    pwd_h = md5.hexdigest()

    old_user = User0.objects.filter(user_id=user_id)
    token = make_token(user_id)
    if old_user:
      return JsonResponse({'code': 200, 'user_id': user_id, 'data': {'token': token.decode()}})
    else:
      try:
        nickname = '用户'+str(random.randint(1000, 9999))
        print(nickname)
        info = '这个人很懒，什么都没有留下'
        avatar = 'avatar/boy.png'
        user = User0.objects.create(user_id=user_id,pwd=pwd,nickname=nickname,info=info, avatar=avatar)
      except:
        result = {'code': 10107, 'error': '入库失败'}
        return JsonResponse(result)
      
      return JsonResponse({'code': 200, 'user_id': user_id, 'data': {'token': token.decode()}})

  @method_decorator(login_check)
  def put(self, request, user_id):
    json_str = request.body
    py_obj = json.loads(json_str)
    print(py_obj)
    nickname = py_obj['nickname']
    gender = py_obj['gender']
    location = py_obj['location']
    birthday = py_obj['birthday']
    sign = py_obj['sign']
    info = py_obj['info']
    
    try:
      user = request.myuser
      user.nickname = nickname
      user.gender = gender
      user.location = location
      user.birthday = birthday
      user.sign = sign
      user.info = info 
      user.save()
    except:
      result = {'code': 10109, 'error': '保存失败'}
      return JsonResponse(result)

    result = {'code': 200, 'user_id': user_id}
    return JsonResponse(result)
    
    

def sms_view(request):
    json_str = request.body
    py_obj = json.loads(json_str)
    phone = py_obj['phone']

    reg = '^1[0-9]{10}$'
    if not phone:
      return JsonResponse({'code': 10101, 'error': '请输入手机号'})
    elif not re.match(reg, phone):
      return JsonResponse({'code': 10104, 'error': '手机号格式不正确'})

    code = random.randint(1000, 9999)
    print(phone, code)

    # 1 先验证码暂存(redis)，以备注册时使用
    cache_key = 'sms_%s' % phone
    cache.set(cache_key, code, 65)
    # 2 发送短信验证码
    # x = YunTongXin(settings.SMS_ACCOUNT_ID,
    #                settings.SMS_ACCOUNT_TOKEN,
    #                settings.SMS_APP_ID,
    #                settings.SMS_TEMPLATE_ID)
    # res = x.run(phone, code)
    # print(res)
    return JsonResponse({'code': 200})

def make_token(user_id, expire=3600*24):
  key = settings.JWT_TOKEN_KEY
  now = time.time()
  payload = {'user_id': user_id, 'exp': now+expire}
  return jwt.encode(payload, key, algorithm='HS256')

@login_check
def user_avatar(request, user_id):
  if request.method != 'POST':
    result = {'code': 10111, 'error': '请求方式错误'}
    return JsonResponse(result)

  user = request.myuser
  user.avatar = request.FILES['avatar']
  user.save()
  result = {'code': 200, 'user_id': user_id}
  return JsonResponse(result)