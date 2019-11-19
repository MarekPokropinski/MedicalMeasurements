"""measurements_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from rest_framework import response, schemas
from rest_framework.decorators import api_view, renderer_classes
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view


@api_view()
@renderer_classes([OpenAPIRenderer])
def schema_view(request):
    generator = schemas.SchemaGenerator(title='Medical Measurements API')
    return response.Response(generator.get_schema(request=request))


urlpatterns = [
    url(r'^swagger$', schema_view),
    url(r'^admin/', admin.site.urls),
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    url(r'^api/', include('measurements.urls')),
    url(r'^auth/login/', include('Authorization.urls')),
]
