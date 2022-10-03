

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from api.views import (UserViewSet, CourseViewSet, TestViewSet,
                        BlogViewSet, CommentViewSet, ViewVideoViewSet)

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'courses', CourseViewSet, basename='courses')
router.register(r'tests', TestViewSet, basename='tests')
router.register(r'blogs', BlogViewSet, basename='blogs')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'view_video', ViewVideoViewSet, basename='view_video')

urlpatterns = [
	path('', include(router.urls)),
	path('password_reset', include('django_rest_passwordreset.urls'))
]
