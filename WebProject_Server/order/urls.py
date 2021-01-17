from django.urls import path
from . import views

urlpatterns = [
    # path('<int:uid>', views.OrderView.as_view()),
    path('<int:uid>/address', views.user_address),
    # path('item', views.receiver_order),
]
