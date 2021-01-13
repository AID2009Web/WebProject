from celery import Celery
from django.conf import settings
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'WebProjects_Server.settings')

app = Celery('WebProjects')

app.conf.update(BROKER_URL = 'redis://@127.0.0.1:6379/1')

app.autodiscover_tasks(settings.INSTALLED_APPS)
