from WebProject_Server.celery import app
from tools.sms import YunTongXin
from django.conf import settings


@app.task
def send_sms(phone, code):
    # 发送短信验证码
    x = YunTongXin(settings.SMS_ACCOUNT_ID,
                   settings.SMS_ACCOUNT_TOKEN,
                   settings.SMS_APP_ID,
                   settings.SMS_TEMPLATE_ID)
    res = x.run(phone, code)
    return res
