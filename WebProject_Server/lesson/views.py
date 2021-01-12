from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.core.cache import cache

import json

from tools.login_dec import login_check, get_user_by_request
from tools.cache_dec import lesson_cache
from user.models import User
from lesson.models import Lesson
from message.models import MessageLesson

# Create your views here.
class LessonView(View):
  @method_decorator(lesson_cache(600))
  def get(self, request, uid):
    # print('-in views-')
    try:
      author = User.objects.get(id=uid)
    except:
      result = {'code': 10404, 'error': '访问用户不存在' }
      return JsonResponse(result)

    vistor = get_user_by_request(request)

    lid = request.GET.get('lid')
    is_self = False

    if lid:
      if vistor == author.id:
        is_self = True
        try: 
          author_lesson = Lesson.objects.get(id=lid, author_id=author.id)
        except:
          result = {'code': 10405, 'error': '访问教程不存在'}
          return JsonResponse(result)
      else:
        try: 
          author_lesson = Lesson.objects.get(id=lid, author_id=author.id, limit='public')
        except:
          result = {'code': 10405, 'error': '访问教程不存在'}
          return JsonResponse(result)
      
      res = self.make_lesson_res(author, author_lesson, is_self)
      return JsonResponse(res)

    else:
      if vistor == author.id :
        author_lessons = Lesson.objects.filter(author_id=author.id)
      else:
        author_lessons = Lesson.objects.filter(author_id=author.id, limit='public')

      res = self.make_lessons_res(vistor, author, author_lessons)
      return JsonResponse(res)



  @method_decorator(login_check)
  def post(self, request, uid):
    

    title = request.POST.get('title')
    category = request.POST.get('category')
    limit = request.POST.get('limit')
    content = request.POST.get('content')
    content_text = request.POST.get('content_text')
    video = request.POST.get('video')
    

    if limit not in ['public', 'private']:
      result = {'code': 10401, 'error': '权限码错误'}
      return JsonResponse(result)

    if category not in ['food', 'life']:
      result = {'code': 10402, 'error': '分类码错误'} 
      return JsonResponse(result)

    introduce = content_text[:110]+'...'

    img_exist = False
    try:
      image = request.FILES['cover']
      img_exist = True
    except:
      img_exist = False
    print(img_exist)
    author = request.myuser
    try:
      if img_exist:
        print(image)
        Lesson.objects.create(title=title, category=category, limit=limit, introduce=introduce, content=content, video=video, image=image, author=author)
      else:
        Lesson.objects.create(title=title, category=category, limit=limit, introduce=introduce, content=content, video=video, author=author)

    except:
      result = {'code': 10403, 'error': '入库失败'}
      return JsonResponse(result)
    
    self.clear_lesson_cache(request)
    return JsonResponse({'code': 200, 'uid': author.id,})
      
  @method_decorator(login_check)
  def delete(self, request, uid):
    try:
      author = User.objects.get(id=uid)
    except:
      result = {'code': 10404, 'error': '访问用户不存在' }
      return JsonResponse(result)

    operator = request.myuser
    if operator != author:
      print(operator)
      print(author.id)
      result = {'code': 10406, 'error': '没有权限'}
      return JsonResponse(result)

    lid = request.GET.get('lid')
    try: 
      author_lesson = Lesson.objects.get(id=lid, author_id=author.id)
    except:
      result = {'code': 10405, 'error': '访问教程不存在'}
      return JsonResponse(result)

    try:
      author_lesson.delete()
    except:
      result = {'code': 10407, 'error': '数据库操作失败'}
      return JsonResponse(result)

    self.clear_lesson_cache(request)
    return JsonResponse({'code': 200})

  def make_lessons_res(self, vistor_id, author, author_lessons):
    lessons_res = []
    for lesson in author_lessons:
      data = {}
      data['id'] = lesson.id
      data['category'] = lesson.category
      data['limit'] = lesson.limit
      data['introduce'] = lesson.introduce
      data['image'] = str(lesson.image)
      data['author'] = author.nickname
      data['created_time'] = lesson.created_time.strftime('%Y-%m-%d %H:%M:%S')

      data['comment'] = self.get_all_messages(lesson)[1]
      lessons_res.append(data)

    result = {'code': 200, 'data': {}}
    result['data']['lessons'] = lessons_res
    result['data']['reader'] = vistor_id
    return result

  def make_lesson_res(self, author, author_lesson, is_self):
    result = {'code': 200, 'data': {}}
    result['data']['id'] = author_lesson.id
    result['data']['title'] = author_lesson.title
    result['data']['category'] = author_lesson.category
    result['data']['limit'] = author_lesson.limit
    result['data']['introduce'] = author_lesson.introduce
    result['data']['content'] = author_lesson.content
    result['data']['video'] = author_lesson.video
    result['data']['author'] = author.nickname
    result['data']['created_time'] = author_lesson.created_time.strftime('%Y-%m-%d %H:%M:%S')

    msg_list, msg_count = self.get_all_messages(author_lesson)
    result['data']['messages'] = msg_list
    result['data']['messages_count'] = msg_count
    return result
    
  def get_all_messages(self, author_lesson):
    all_messages = MessageLesson.objects.filter(lesson=author_lesson).order_by('-created_time')
    msg_list = []
    r_dict = {}
    msg_count = 0
    for msg in all_messages:
      if msg.parent_message:
        r_dict.setdefault(msg.parent_message,[])
        r_dict[msg.parent_message].append({
          'msg_id': msg.id,
          'content': msg.content,
          'publisher': msg.user.nickname,
          'publisher_avatar': str(msg.user.avatar),
          'created_time': msg.created_time.strftime('%Y-%m-%d %H:%M:%S'),
        })
      else:
        msg_count += 1
        msg_list.append({
          'id':msg.id,
          'content':msg.content,
          'publisher':msg.user.nickname,
          'publisher_avatar':str(msg.user.avatar),
          'created_time':msg.created_time.strftime('%Y-%m-%d %H:%M:%S'),
          'reply':[]
        })
    for m in msg_list:
      if m['id'] in r_dict:
        m['reply'] = r_dict[m['id']]
    return msg_list,msg_count

  def clear_lesson_cache(self, request):
    path = request.path_info
    all_key_p = ['lesson_cache_self_', 'lesson_cache_']
    all_keys = []
    for key_p in all_key_p:
      for key_h in ['', '?category=food', '?category=life']:
        all_keys.append(key_p + path + key_h)
    cache.delete_many(all_keys)
    


