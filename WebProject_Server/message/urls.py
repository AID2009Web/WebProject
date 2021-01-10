from django.urls import path
from . import views

urlpatterns = [
    path('t/<int:tid>',views.message_topic_view),
    path('l/<int:lid>',views.message_lesson_view),
]