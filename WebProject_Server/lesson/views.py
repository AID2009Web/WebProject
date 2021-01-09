from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse

import json

from tools.login_dec import login_check, get_user_by_request
from user.models import User
from lesson.models import Lesson

# Create your views here.
class LessonView(View):
  


  @method_decorator(login_check)
  def post(self, request, uid):
    json_str = request.body
    py_obj = json.loads(json_str)

    title = py_obj['title']
    category = py_obj['category']
    limit = py_obj['limit']
    content = py_obj['content']
    content_text = py_obj['content_text']
    video = py_obj['video']

    if limit not in ['public', 'private']:
      result = {'code': 10401, 'error': '权限码错误'}
      return JsonResponse(result)

    if category not in ['food', 'life']:
      result = {'code': 10402, 'error': '分类码错误'} 
      return JsonResponse(result)

    introduce = content_text[:110]+'...'

    author = request.myuser
    try:
      Lesson.objects.create(title=title, category=category, limit=limit, introduce=introduce, content=content, video=video, author=author)
    except:
      result = {'code': 10403, 'error': '入库失败'}
      return JsonResponse(result)
    return JsonResponse({'code': 200, 'uid': author.id,})
      
  def get(self, request, uid):
    try:
      author = User.objects.get(id=uid)
    except:
      result = {'code': 10404, 'error': '访问用户不存在' }
      return JsonResponse(result)

    vistor = get_user_by_request(request)
    if vistor == author.id :
      author_lessons = Lesson.objects.filter(author_id=uid)
    else:
      author_lessons = Lesson.objects.filter(author_id=uid, limit='public')

    res = self.make_lessons_res(vistor, author, author_lessons)
    return JsonResponse(res)


  def make_lessons_res(self, vistor_id, author, author_lessons):
    lessons_res = []
    for lesson in author_lessons:
      data = {}
      data['id'] = lesson.id
      data['category'] = lesson.category
      data['limit'] = lesson.limit
      data['introduce'] = lesson.introduce
      data['author'] = author.nickname
      data['created_time'] = lesson.created_time.strftime('%Y-%m-%d %H:%M:%S')
      lessons_res.append(data)

    result = {'code': 200, 'data': {}}
    result['data']['lessons'] = lessons_res
    result['data']['reader'] = vistor_id
    return result


