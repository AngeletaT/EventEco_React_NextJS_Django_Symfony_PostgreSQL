from rest_framework.routers import DefaultRouter
from .views import E_EventCategoryViewSet

router = DefaultRouter()
router.register(r'categories', E_EventCategoryViewSet, basename='eventcategory')

urlpatterns = router.urls
