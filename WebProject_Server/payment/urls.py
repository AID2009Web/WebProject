from . import views
from django.urls import path

urlpatterns = [
    path('jump/', views.JumpView.as_view()),
    path('result/', views.ResultView.as_view()),
]