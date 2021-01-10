from django.shortcuts import render
from django.http import JsonResponse

import json

from tools.login_dec import login_check
from topic.models import Topic
from lesson.models import Lesson
from message.models import MessageTopic, MessageLesson

# Create your views here.
@login_check
def message_topic_view(request, tid):
  if request.method != 'POST':
    result = {'code': 10500, 'error': '请求错误'}
    return JsonResponse(result)
  json_str = request.body
  py_obj = json.loads(json_str)
  content = py_obj['content']
  parent_id = py_obj.get('parent_id', 0)
  print(parent_id)
  try:
    topic = Topic.objects.get(id=tid)
  except:
    result = {'code': 10501, 'error': '评论不存在'}
    return JsonResponse(result)
  
  user = request.myuser
  try:
    MessageTopic.objects.create(topic=topic, user=user, content=content, parent_message=parent_id)
  except:
    result = {'code': 10502, 'error': '评论入库失败'}
    return JsonResponse(result)
  
  return JsonResponse({'code': 200})

@login_check
def message_lesson_view(request, lid):
  if request.method != 'POST':
    result = {'code': 10500, 'error': '请求错误'}
    return JsonResponse(result)
  json_str = request.body
  py_obj = json.loads(json_str)
  content = py_obj['content']
  parent_id = py_obj.get('parent_id', 0)

  try:
    lesson = Lesson.objects.get(id=lid)
  except:
    result = {'code': 10501, 'error': '评论不存在'}
    return JsonResponse(result)
  
  user = request.myuser
  try:
    MessageLesson.objects.create(lesson=lesson, user=user, content=content, parent_message=parent_id)
  except:
    result = {'code': 10502, 'error': '评论入库失败'}
    return JsonResponse(result)
  
  return JsonResponse({'code': 200})