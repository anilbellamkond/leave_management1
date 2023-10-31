"""
URL configuration for leave_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from app1.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',logins,name="logins"),
    path('employ/<int:id>',employee,name="employ"),
    path('signout/',user_logout,name='signout'),
    path('leave_history/<int:pk>',leave_history,name="leave_history"),
    path('leave_request/<int:pk>',leave_request,name="leave_request"),
    path('admins/<int:id>',admins,name='admins'),
    path('prequest/<int:id>',pending_request,name='prequest'),
     path('arequest/<int:id>',approved_request,name='arequest'),
      path('Rrequest/<int:id>',rejected_request,name='Rrequest'),
    path('view_update/<int:id>/<int:pk>',view_record_update_status,name='view_update')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)