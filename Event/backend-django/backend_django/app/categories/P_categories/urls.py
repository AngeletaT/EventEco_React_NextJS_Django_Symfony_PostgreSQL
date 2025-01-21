from rest_framework.routers import DefaultRouter
from .views import P_EventCategoryViewSet

router = DefaultRouter()
router.register(r'categories', P_EventCategoryViewSet, basename='eventcategory')

urlpatterns = router.urls
