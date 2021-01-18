from django.urls import path
from . import views

urlpatterns = [
#'weibo/authorization'
    path('authorization',views.get_url),
#token?code="+code,
    path('token',views.get_uid),
]