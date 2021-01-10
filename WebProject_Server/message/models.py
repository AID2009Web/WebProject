from django.db import models
from user.models import User
from topic.models import Topic
from lesson.models import Lesson

# Create your models here.
class MessageTopic(models.Model):
  topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  content = models.CharField('内容', max_length=50)
  created_time = models.DateTimeField(auto_now_add=True)
  parent_message = models.IntegerField('哪个评论的回复',default=0)
  
class MessageLesson(models.Model):
  lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  content = models.CharField('内容', max_length=50)
  created_time = models.DateTimeField(auto_now_add=True)
  parent_message = models.IntegerField('哪个评论的回复',default=0)