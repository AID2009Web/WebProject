from django.http import HttpResponse
from django.shortcuts import render

def default_view(request):
  return render(request,'index.html')

def login_view(request):
  return render(request, 'login.html')

def square_view(request):
  return render(request, 'square.html')

def shop_view(request):
  return render(request, 'shop.html')

def hm_view(request, uid):
  return render(request, 'homepage_m.html')

def hl_view(request, uid):
  return render(request, 'homepage_l.html')

def hc_view(request, uid):
  return render(request, 'homepage_c.html')

def info_view(request, uid):
  return render(request, 'info.html')

def topic_view(request, uid):
  return render(request, 'topic.html')

def lesson_add_view(request, uid):
  return render(request, 'lesson_add.html')

def lesson_view(request, uid, lid):
  return render(request, 'lesson.html')

def order_view(request, oid):
  return render(request, 'order.html')

def order_test_view(request):
  return render(request, 'order.html')

def item_view(request, gid):
  return render(request, 'shopitem.html')

def item_add_view(request):
  return render(request, 'shopitem_add.html')

def item_del_view(request):
  return render(request, 'shopitem_del.html')

def login_callback(request):
  return render(request,'oauth_callback.html')