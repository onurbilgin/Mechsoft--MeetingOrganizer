from django.conf.urls import url
from meetingApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^meeting$',views.meetingApi),
    url(r'^meeting/([0-9]+)$',views.meetingApi),
]