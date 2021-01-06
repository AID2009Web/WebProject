from django.urls import path
from . import views

urlpatterns =[
  path('<int:uid>', views.TopicView.as_view())
]