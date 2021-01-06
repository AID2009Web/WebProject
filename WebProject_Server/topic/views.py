from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse

import json

from tools.login_dec import login_check
from topic.models import Topic


# Create your views here.
class TopicView(View):

  @method_decorator(login_check)
  def post(self, request,user_id):
    json_str = request.body
    py_obj = json.loads(json_str)
    print(py_obj)
    content = py_obj['content']
    limit = py_obj['limit']
    
    if limit not in ['public', 'private']:
      result ={'code': 10301, 'error': '权限码错误'}
      return JsonResponse(result)

    author = request.myuser
    try:
      Topic.objects.create(limit=limit,content=content,author=author)
    except:
      result = {'code': 10302, 'error': '入库失败'}
      return JsonResponse(result)
    return JsonResponse({'code': 200, 'user_id': author.user_id,})

    

