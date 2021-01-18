import time

import jwt
import requests
from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings


# Create your views here.
from user.models import User
# from weibo.models import WeiBo


def get_url(request):
    print('进入后台函数')
    weibo_auth_url = "https://api.weibo.com/oauth2/authorize"
    response_type = 'code'
    state = 'test'
    client_id = settings.WEIBO_CLIENT_ID
    redirect_uri = settings.REDIRECT_URI
    auth_url = weibo_auth_url + \
               '?response_type=%s&state=%s&client_id=%s&redirect_uri=%s' % (
                   response_type, state, client_id, redirect_uri)
    print(auth_url)
    print(redirect_uri)
    return JsonResponse({'code': 200, 'auth_url': auth_url})


def get_uid(request):
    code = request.GET.get('code')
    if request.method == 'GET':
        access_toke_url = 'https://api.weibo.com/oauth2/access_token'
        re_dict = requests.post(access_toke_url, data={
            'client_id': settings.WEIBO_CLIENT_ID,
            'client_secret': settings.WEIBO_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': settings.REDIRECT_URI,
        })
        tmp = re_dict.json()
        print(tmp)
        access_token = tmp['access_token']
        get_token_info_url = 'https://api.weibo.com/oauth2/get_token_info'
        re_dict1 = requests.post(url=get_token_info_url, data={
            'access_token': access_token,
        })
        tmp1 = re_dict1.json()
        # uid = tmp1['uid']

        # print('########', uid)
        # # 获取微博用户信息(uid/  昵称/ 头像/   个性签名  /用户所在地)
        # # user_id    nickname   avatar   info   location
        # weibo_info_url = 'https://api.weibo.com/2/users/show.json'
        # re_dict2 = requests.get(url=weibo_info_url, data={
        #     'client_id': settings.WEIBO_CLIENT_ID,
        #     'client_secret': settings.WEIBO_CLIENT_SECRET,
        #     'access_token': access_token,
        #     'uid': uid})
        # print(re_dict2)
        # tmp2=re_dict2.json()
        # print('***********')
        # print(tmp2)
        # nickname=tmp2['screen_name']
        # avatar=tmp2['profile_image_url']
        # info=tmp2['description']
        # location=['location']
        # print(uid,nickname,info,location)
        
        # user = WeiBo.objects.create(user_id=uid,)

        # #生成token
        # token = make_token(uid).decode()
        # print(uid,token)

        user_id = tmp1['uid']
        old_user = User.objects.filter(user_id=user_id)
    
        if old_user:
          token = make_token(old_user[0].id)
          return JsonResponse({'code': 200, 'uid': old_user[0].id, 'data': {'token': token.decode()}})
        else:
          try:
            nickname = '用户'+str(user_id)[-4:]
            print(nickname)
            info = '这个人很懒，什么都没有留下'
            avatar = 'avatar/boy.png'
            user = User.objects.create(user_id=user_id,nickname=nickname,info=info, avatar=avatar)
            uid = get_weibo_uid(user_id)  
            token = make_token(uid)
          except Exception as e:
            print(e)
            result = {'code': 10107, 'error': '入库失败'}
            return JsonResponse(result)

        return JsonResponse({'code': 200,
                             'uid': uid,
                             'data': {'token': token},
                             })


def make_token(uid, expire=3600 * 24):
    key = settings.JWT_TOKEN_KEY
    now = time.time()
    payload = {'uid': uid, 'exp': now + expire}
    return jwt.encode(payload, key, algorithm='HS256')

def get_weibo_uid(user_id):
  user = User.objects.get(user_id=user_id)
  return user.id
