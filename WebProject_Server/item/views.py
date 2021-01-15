from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

import json

from item.models import Item, ItemType
# Create your views here.
class ItemView(View):
  def get(self, request):
    gid = request.GET.get('gid')
    print(gid)
    if gid:
      try:
        item = Item.objects.get(id=gid)
      except:
        result = {'code': 10606, 'error': '商品不存在'}
        return JsonResponse(result)
      data = {}
      data['gid'] = item.id
      data['title'] = item.title
      data['category'] = item.category
      data['image'] = str(item.image)
      data['content'] = item.content
      data['type'] = []
      item_types = ItemType.objects.filter(item_id=item.id)
      for item_type in item_types:
        res = {}
        res['type_id'] = item_type.type_id  
        res['introduce'] = item_type.introduce
        res['price'] = item_type.price
        data['type'].append(res)

      result = {'code': 200, 'item': data}  
    else:

      item_list = Item.objects.filter()
      item_res = []
      for item in item_list:
        data = {}
        data['gid'] = item.id
        data['title'] = item.title
        data['category'] = item.category
        data['image'] = str(item.image)
        
        item_type = ItemType.objects.get(item_id=item.id,type_id='0')
        data['price'] = item_type.price 
        
        item_res.append(data)
      
      result = {'code': 200, 'data': {}}
      result['data']['items'] = item_res
   
    return JsonResponse(result)

  def post(self, request):
    title = request.POST.get('title')
    category = request.POST.get('category')
    content = request.POST.get('content')
    type_list = request.POST.get('type')
    
    if title == '' :
      result = {'code': 10601, 'error': '标题为空'}

    if category not in ['food', 'life']:
      result = {'code': 10602, 'error': '分类码错误'} 
      return JsonResponse(result)


    img_exist = False
    try:
      image = request.FILES['cover']
      img_exist = True
    except:
      img_exist = False
    print(img_exist)

    try:
      if img_exist:
        item = Item.objects.create(title=title,category=category,content=content,image=image)
        
      else:
        item = Item.objects.create(title=title,category=category,content=content,)
    except:
      result = {'code': 10603, 'error': '商品入库失败'}
      return JsonResponse(result)


    try:
      type_list = type_list.split(',')
      for i in range(0,len(type_list),3):
        typeId = type_list[i]
        introduce = type_list[i+1]
        price = float(type_list[i+2])
        
        if typeId=='':
          break
        if introduce == '':
          introduce = '款式'
        elif len(introduce) > 10:
          result = {'code': 10604, 'error': '文本长度过长'}
          return JsonResponse(result)
        if price == '' or price > 999999.99:
          price = 999999.99

        ItemType.objects.create(item_id=item.id,type_id=typeId,introduce=introduce,price=price)
    except Exception as e:
      print(e)
      result = {'code': 10605, 'error': '款式入库失败'}
      return JsonResponse(result)
        
    # self.clear_lesson_cache(request)
    return JsonResponse({'code': 200})
  
  def put(self, request):
    return JsonResponse({'code':405})

  def delete(self, request):
    gid = request.GET.get('gid')
    if gid:
      try:
        item = Item.objects.get(id=gid)
      except:
        result = {'code': 10606, 'error': '商品不存在'}
        return JsonResponse(result)
      print(item)
      try:
        item.delete()
      except Exception as e:
        print(e)
        result = {'code': 10607, 'error': '数据库操作失败'}
        return JsonResponse(result)

      return JsonResponse({'code': 200})
