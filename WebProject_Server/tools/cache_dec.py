from django.core.cache import cache
from tools.login_dec import get_user_by_request

def lesson_cache(expire):
  def _lesson_cache(func):
    def wrapper(request, *args, **kwargs):
      if 'lid' in request.GET.keys():
        return func(request, *args, **kwargs)

      vistor_id = get_user_by_request(request)
      author_id = kwargs['uid']
      if vistor_id == author_id:
        cache_key = 'lesson_cache_self_%s' % (request.get_full_path())
      else:
        cache_key = 'lesson_cache_%s' % (request.get_full_path())
      # print('-cache key is %s-' % cache_key)

      res = cache.get(cache_key)
      if res:
        print('-cache in-')
        return res
      res = func(request, *args, **kwargs)
      cache.set(cache_key, res, expire)
      return res
    return wrapper
  return _lesson_cache

      