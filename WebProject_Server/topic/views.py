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

    res = self.make_topics_res(vistor, author, author_topics)
    return JsonResponse(res)

  @method_decorator(login_check)
  def post(self, request, uid):
    json_str = request.body
    py_obj = json.loads(json_str)
    
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

  
  @method_decorator(login_check)
  def delete(self, request, uid):
    try:
      author = User.objects.get(id=uid)
    except:
      result = {'code': 10303, 'error': '访问用户不存在' }
      return JsonResponse(result)

    operator = request.myuser
    if operator != author:
      result = {'code': 10305, 'error': '没有权限'}
      return JsonResponse(result)

    tid = request.GET.get('tid')
    try: 
      author_topic = Topic.objects.get(id=tid, author_id=author.id)
    except:
      result = {'code': 10304, 'error': '访问动态不存在'}
      return JsonResponse(result)

    try:
      author_topic.delete()
    except:
      result = {'code': 10306, 'error': '数据库操作失败'}
      return JsonResponse(result)

    # self.clear_topic_cache(request)
    return JsonResponse({'code': 200})


  def make_topics_res(self, vistor_id, author, author_topics):
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
    result['data']['reader'] = vistor_id
    return result
