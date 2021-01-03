from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View

import json
import hashlib

from user.views import make_token
from user.models import User0

# Create your views here.
class TokenView(View):
  def get(self, request):
    return HttpResponse('get tokens')

  def post(self, request):
    json_str = request.body
    py_obj = json.loads(json_str)
    user_id = py_obj['user_id']
    pwd = py_obj['pwd']

    try:
      user = User0.objects.get(user_id=user_id)
    except:
      result = {'code': 10201, 'error': '用户名或密码错误'}
      return JsonResponse(result)

    md5 = hashlib.md5()
    md5.update(pwd.encode())
    pwd_h = md5.hexdigest()
    if pwd_h != user.pwd:
      result = {'code': 10202, 'error': '用户名或密码错误'}
      return JsonResponse(result)

    token = make_token(user_id)
    return JsonResponse({'code': 200, 'user_id': user_id, 'data': {'token': token.decode()}})

