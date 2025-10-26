from django.urls import path
from . import views

urlpatterns = [
    path('regressor', views.regressor_view, name='regressor'),
]