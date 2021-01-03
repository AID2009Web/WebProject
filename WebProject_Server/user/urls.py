from django.urls import path
from . import views

urlpatterns = [
  path('sms', views.sms_view),
  path('<int:user_id>', views.UsersView.as_view()),
  path('<int:user_id>/avatar', views.user_avatar),
]