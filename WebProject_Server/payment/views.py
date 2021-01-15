import json
import re

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.conf import settings

# Create your views here.
from django.views import View
from alipay import AliPay

app_private_key_string = open(settings.ALIPAY_KEY_DIR + 'app_private_key.pem').read()
alipay_public_key_string = open(settings.ALIPAY_KEY_DIR + 'alipay_public_key.pem').read()
class MyAliPay(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.alipay = AliPay(
            appid=settings.ALIPAY_APPID,
            app_notify_url=None,
            app_private_key_string=app_private_key_string,
            alipay_public_key_string=alipay_public_key_string,
            sign_type='RSA2',
            debug=True,
        )

    def get_trade_url(self, order_id, amount):
        base_url = 'https://openapi.alipaydev.com/gateway.do'
        order_string = self.alipay.api_alipay_trade_page_pay(
            out_trade_no=order_id,
            total_amount=amount,
            subject=order_id,
            return_url=settings.ALIPAY_RETURN_URL,
            notify_url=settings.ALIPAY_NOTIFY_URL,
        )
        return base_url + '?' + order_string

    def get_trade_result(self, order_id):
        result = self.alipay.api_alipay_trade_query(out_trade_no=order_id)
        if result.get('trade_status') == 'TRADE_SUCCESS':
            return True
        return False

    def get_verify_result(self, data, sign):
        return self.alipay.verify(data, sign)

class JumpView(MyAliPay):
    def get(self, request):
        return render(request, 'ajax_alipay.html')

    def post(self, request):
        json_obj = json.loads(request.body)
        order_id = json_obj['order_id']
        price = re.findall('2019111821315602(.*)',order_id, re.S)[0]
        pay_url = self.get_trade_url(order_id, price)
        return JsonResponse({'code': 200, 'pay_url': pay_url})

ORDER_STATUS = 1
class ResultView(MyAliPay):
    def get(self, request):
        # return HttpResponse('支付完成')
        request_data = {k: request.GET[k] for k in request.GET.keys()}
        print(request_data)
        order_id = request_data['out_trade_no']
        if ORDER_STATUS == 2:
            return HttpResponse('支付成功')
        elif ORDER_STATUS == 1:
            result = self.get_trade_result(order_id)
            if result:
                return HttpResponse('主动查询结果：支付成功')
            else:
                return HttpResponse('主动查询结果：支付失败')

    def post(self, request):
        request_data = {k: request.POST[k] for k in request.POST.keys()}
        sign = request_data.pop('sign')
        is_verify = self.get_verify_result(request_data, sign)
        if is_verify:
            trade_status = request_data['trade_status']
            if trade_status == 'TRADE_SUCCESS':
                return HttpResponse('change to success is OK')
            else:
                return HttpResponse('change to fault isOK')
        else:
            return HttpResponse('请求不合法')
