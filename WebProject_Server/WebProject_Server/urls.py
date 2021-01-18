"""WebProject_Server URL Configuration

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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from user import views as user_views
from lesson import views as lesson_views
from order import views as order_views
from item import views as item_views
# from wtoken import views as wtoken_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/u', user_views.UsersView.as_view()),
    path('v1/u/', include('user.urls')),
    # path('v1/tokens', wtoken_views.TokenView.as_view()),
    path('v1/topic/',include('topic.urls')),
    path('v1/lesson',lesson_views.LessonView.as_view()),
    path('v1/lesson/', include('lesson.urls')),
    path('v1/message/',include('message.urls')),
    path('v1/item',item_views.ItemView.as_view()),
    # path('v1/item/', include('item.urls')),
    path('v1/order', order_views.OrderView.as_view()),
    path('payment/', include('payment.urls')),
    path('v1/order/', include('order.urls')),
    path('weibo/',include('weibo.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)