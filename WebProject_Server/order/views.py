import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View

from order.models import Order, BuyerAddr
from item.models import Item
from order.models import Item as OrderItem
from tools.login_dec import login_check
from user.models import User


class OrderView(View):
    @method_decorator(login_check)
    def get(self, request):
        oid = request.GET.get('oid')
        print(oid)
        if oid:
            print(oid)
            try:
                order = Order.objects.get(id=oid)
            except:
                result = {'code': 10704, 'error': '订单不存在'}
                return JsonResponse(result)

            user = request.myuser
            if user != order.buyer:
                result = {'code': 10704, 'error': '订单不存在'}
                return JsonResponse(result)

            try:
                items = OrderItem.objects.filter(order=oid)
            except:
                result = {'code': 10705, 'error': '订单商品获取失败'}
                return JsonResponse(result)

            print(items)
            res = self.get_item(items)
            result = {'code': 200, 'data': {}}
            result['data']['item'] = res
            print(res)
            return JsonResponse(result)
        else:
            # json样例如下
            result = {"code": 200,
                      "data": {
                          "item": [
                              {
                                  "id": "001",
                                  "title": "农夫好牛 精品肥牛卷鲜嫩牛肉卷1200g",
                                  "image": "../static/images/beef.jpg",
                                  "price": 99.00,
                                  "count": 1
                              },
                              {
                                  "id": "002",
                                  "title": "郑发哥 猪肉卷猪肉饼 500g 潮汕特产 潮汕家庭炒菜常备 潮汕猪肉饼500g",
                                  "image": "../static/images/uimg.jpg",
                                  "price": 35.00,
                                  "count": 3
                              },
                              {
                                  "id": "003",
                                  "title": "坤兴 冷冻鱿鱼须国产鱿鱼爪 380g/包 火锅 烧烤 生鲜 海鲜水产",
                                  "image": "../static/images/vimg.jpg",
                                  "price": 39.90,
                                  "count": 1
                              }
                          ],
                          "username": "tedu"
                      }
                      }
            return JsonResponse(result)

    @method_decorator(login_check)
    def post(self, request):
        json_str = request.body
        py_obj_list = json.loads(json_str)

        buyer = request.myuser
        try:
            order = Order.objects.create(status='100', buyer=buyer)
        except Exception as e:
            print(e)
            result = {'code': 10701, 'error': '订单创建失败'}
            return JsonResponse(result)

        oid = order.id

        for py_obj in py_obj_list:
            gid = py_obj['gid']
            count = py_obj['orderNum']
            price = py_obj['price']

            try:
                item = Item.objects.get(id=gid)
            except:
                result = {'code': 10702, 'error': '商品不存在'}
                return JsonResponse(result)
            try:
                orderitem = OrderItem.objects.create(order=order, item=item, count=count, price=price)
            except Exception as e:
                print(e)
                result = {'code': 10703, 'error': '商品订单创建失败'}
                return JsonResponse(result)
            print(orderitem.id)
            return JsonResponse({'code': 200, 'oid': oid})

    def get_item(self, items):
        res = []
        for item in items:
            i = {}
            i['id'] = item.item_id
            i['price'] = item.price
            i['count'] = item.count

            try:
                good = Item.objects.get(id=item.item_id)
            except Exception as e:
                result = {'code': 10702, 'error': '商品不存在'}
                return JsonResponse(result)
            i['title'] = good.title
            i['image'] = str(good.image)
            res.append(i)
        return res

        # 入库1 order_order
        # Order.objects.create(status=100, order=order_num, buyer=username, address=addr_id, date=auto)

        # 入库2 order_item
        # for i in py_obj['item']
        #   price = xx.objects.get(item=i['item_id'])
        #   Item.objects.create(order=Order, item=i['item_id'], count=i['item_count'],
        #                       price=price, comment='', date=auto)

        # 入库3 order_lesson
        # Lesson.objects.create(order=Order, lesson= , price= )

        # 入库4 order_status
        # Status.objects.create(order=Order, status=100, date_created=auto, date_paid= ,
        #                       date_shipped= , date_completed=)


@login_check
def user_address(request, uid):
    if request.method == 'GET':
        # 查表取数据
        try:
            user_obj = User.objects.get(user_id=uid)
        except Exception as e:
            print('-----获取用户id失败-----%d' % e)
            result = {'code': 10706, 'error': 'the user id is error'}
            return JsonResponse(result)
        addr_list = BuyerAddr.objects.filter(buyer=user_obj)
        result = {'code': 200, 'data': {}}
        addr_res = []
        for addr in addr_list:
            a = {}
            a['id'] = addr.id
            a['consignee'] = addr.consignee
            a['tag'] = addr.tag
            a['tel'] = addr.tel
            a['province'] = addr.province
            a['city'] = addr.city
            a['county'] = addr.county
            a['street'] = addr.street
            a['zipcode'] = addr.zipcode
            addr_res.append(a)
        result['data']['addr'] = addr_res
        result['data']['uid'] = uid

        return JsonResponse(result)

    if request.method == 'POST':

        json_str = request.body
        py_obj = json.loads(json_str)
        print(py_obj)

        buyer = py_obj['uid']
        addr_id = py_obj['id']
        consignee = py_obj['consignee']
        tag = py_obj['tag']
        tel = py_obj['tel']
        province = py_obj['province']
        city = py_obj['city']
        county = py_obj['county']
        street = py_obj['street']
        zipcode = py_obj['zipcode']

        try:
            user_obj = User.objects.get(user_id=buyer)
        except Exception as e:
            print('-----获取用户id失败-----%d' % e)
            result = {'code': 10706, 'error': 'the user id is error'}
            return JsonResponse(result)
        if addr_id == '':
            try:
                buyer_obj = BuyerAddr.objects.create(
                    buyer=user_obj, consignee=consignee, tag=tag,
                    tel=tel, province=province, city=city, county=county,
                    street=street, zipcode=zipcode)
                addr_id = buyer_obj.id
            except Exception as e:
                print('地址写入数据库错误：%s' % e)
                result = {'code': 10707, 'error': '地址保存失败，请重试'}
                return JsonResponse(result)
        else:
            try:
                addr_obj = BuyerAddr.objects.get(id=addr_id)
                addr_obj.buyer = user_obj
                addr_obj.consignee = consignee
                addr_obj.tag = tag
                addr_obj.tel = tel
                addr_obj.province = province
                addr_obj.city = city
                addr_obj.county = county
                addr_obj.street = street
                addr_obj.zipcode = zipcode
                addr_obj.save()
            except Exception as e:
                print('地址修改失败：%s' % e)
                result = {'code': 10708, 'error': '地址修改失败，请重试'}
                return JsonResponse(result)

        result = {'code': 200, 'data': {
            "username": buyer, "id": addr_id, "consignee": consignee, "tag": tag,
            "tel": tel, "province": province, "city": city, "county": county,
            "street": street, "zipcode": zipcode
        }}
        return JsonResponse(result)
