from django.urls import path
from . import views

urlpatterns = [
  path('<int:uid>', views.LessonView.as_view())
]