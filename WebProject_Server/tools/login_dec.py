from django.http import JsonResponse
from django.conf import settings
from user.models import User
import jwt

def login_check(func):
  def wrap(request, *args, **kwargs):
    token = request.META.get('HTTP_AUTHORIZATION')
    if not token:
      result = {'code': 10110, 'error': '用户未登录'}
      return JsonResponse(result)
    
    try:
      payload = jwt.decode(token, settings.JWT_TOKEN_KEY, algorithms='HS256')
    except:
      result = {'code': 10111, 'error': '用户未登录'}
      return JsonResponse(result)

    uid = payload['uid']
    user = User.objects.get(id=uid)
    request.myuser = user
    return func(request, *args, **kwargs)
  return wrap
  
def get_user_by_request(request):
  token = request.META.get('HTTP_AUTHORIZATION')
  if not token:
    return None
  else:
    try:
      payload = jwt.decode(token, settings.JWT_TOKEN_KEY)
    except:
      return None
    uid = payload['uid']
    return uid