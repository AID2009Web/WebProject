from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse

import json

from tools.login_dec import login_check, get_user_by_request
from topic.models import Topic
from user.models import User


# Create your views here.
class TopicView(View):
  def make_topics_res(self, author, author_topics):
    topics_res = []
    for topic in author_topics:
      data = {}
      data['id'] = topic.id
      data['limit'] = topic.limit
      data['content'] = topic.content
      data['created_time'] = topic.created_time.strftime('%Y-%m-%d %H:%M:%S')
      data['author'] = author.nickname
      topics_res.append(data)
    result = {'code': 200, 'data': {}}
    result['data']['topics'] = topics_res
    result['data']['uid'] = author.id
    return result

  @method_decorator(login_check)
  def post(self, request, uid):
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
    return JsonResponse({'code': 200, 'uid': author.id,})

  def get(self, request, uid):
    try: 
      author = User.objects.get(id=uid) 
    except:
      result = {'code':10303, 'error': '访问用户不存在'}
      return JsonResponse(result)
    
    vistor = get_user_by_request(request)
    if vistor == author.id :
      author_topics = Topic.objects.filter(author_id=uid)
    else:
      author_topics = Topic.objects.filter(author_id=uid,limit='public')
    print(author_topics)
    res = self.make_topics_res(author, author_topics)
    return JsonResponse(res)
