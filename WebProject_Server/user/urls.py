from django.urls import path
from . import views

urlpatterns = [
  path('sms', views.sms_view),
  path('<int:uid>', views.UsersView.as_view()),
  path('<int:uid>/avatar', views.user_avatar),
]