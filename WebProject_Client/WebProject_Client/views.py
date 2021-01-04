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

def hm_view(request, user_id):
  return render(request, 'homepage_m.html')

def hc_view(request, user_id):
  return render(request, 'homepage_c.html')

def info_view(request, user_id):
  return render(request, 'info.html')

def topic_view(request, user_id):
  return render(request, 'topic.html')