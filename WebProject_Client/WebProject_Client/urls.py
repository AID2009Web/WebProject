"""WebProject_Client URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.default_view),
    path('login', views.login_view),
    path('square', views.square_view),
    path('shop', views.shop_view),
    path('<int:uid>/hm', views.hm_view),
    path('<int:uid>/hl', views.hl_view),
    path('<int:uid>/hc', views.hc_view),
    path('<int:uid>/info', views.info_view),
    path('<int:uid>/topic', views.topic_view),
    path('<int:uid>/lesson', views.lesson_add_view),
    path('<int:uid>/lesson/<int:lid>', views.lesson_view),
]

urlpatterns += staticfiles_urlpatterns()