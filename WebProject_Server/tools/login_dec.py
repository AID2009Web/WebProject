from django.http import JsonResponse
from django.conf import settings
from user.models import User0
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
      result = {'code': 10110, 'error': '用户未登录'}
      return JsonResponse(result)

    user_id = payload['user_id']
    user = User0.objects.get(user_id=user_id)
    request.myuser = user
    return func(request, *args, **kwargs)
  return wrap
  
    