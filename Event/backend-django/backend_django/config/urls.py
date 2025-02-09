"""
URL configuration for backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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

from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
    openapi.Info(
        title="Event API",
        default_version="v1",
        description="Documentación de la API para EventEco y Pawnity",
        terms_of_service="https://www.EventEco&PaWnity.com/terms/",
        contact=openapi.Contact(email="support@tusitio.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Swagger UI
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # Redoc
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # Esquema en JSON
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # Rutas de las apps
    path('e_django/api/categories/', include('backend_django.app.categories.E_categories.urls')),
    path('p_django/api/categories/', include('backend_django.app.categories.P_categories.urls')),
    path('e_django/api/events/', include('backend_django.app.events.E_events.urls')),
    path('p_django/api/events/', include('backend_django.app.events.P_events.urls')),
    path('p_django/api/pets/', include('backend_django.app.pets.urls')),
    path('p_django/api/organizers/', include('backend_django.app.profiles.P_profiles.organizers.urls')),
    # path('p_django/api/client/auth/', include('backend_django.app.accounts.P_accounts.urls')),
    path('e_django/api/client/auth/', include('backend_django.app.accounts.E_accounts.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)