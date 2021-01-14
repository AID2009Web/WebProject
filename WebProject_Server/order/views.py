import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator

from tools.login_dec import login_check


class OrderView(View):
    def get(self, request):
        # 响应商品列表get请求
        # 上一个页面点击购买，将商品信息以json格式发送
        # json包含：商品ID 商品名称 商品图片 商品数量 商品单价
        # 根据商品ID查mysql表，得到名称 图片 单价

        # 参考代码
        # order_items = Item.objects.get(id=id)
        # item_res = []
        # for item in order_items:
        #     i = {}
        #     i['id'] = '001'
        #     i['title'] = '农夫好牛 精品肥牛卷鲜嫩牛肉卷1200g'
        #     i['image'] = '../static/images/beef.jpg'
        #     i['price'] = 99.00
        #     # 数量由用户决定
        #     i['count'] = 1
        #     item_res.append(i)
        #
        # result = {'code': 200, 'data': {}}
        # result['data']['item'] = item_res
        # 把用户名也传入
        # result['data']['username'] = username

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
        py_obj = json.loads(json_str)
        
        # addr_state = py_obj['Checkout[addressState]']
        # pay_id = py_obj['Checkout[pay_id]']
        # shipment_id = py_obj['Checkout[shipment_id]']
        # shiptime_id = py_obj['Checkout[shiptime_id]']
        # # 收货人
        # consignee = py_obj['userAddress[consignee]']
        # province = py_obj['userAddress[province]']
        # street = py_obj['userAddress[street]']
        # tag = py_obj['userAddress[tag]']
        # tel = py_obj['userAddress[tel]']
        # zipcode = py_obj['userAddress[zipcode]']
        print(py_obj)
        # print('==========' + addr_state)
        return JsonResponse({'code': 200})
