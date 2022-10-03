from rest_framework import mixins, viewsets, status
from api.models import Blog, Comment
from api.serializers import CommentCreate,CreateBlogModelSerializer, ListModelSerializer, CommentModelSerializer

from rest_framework.permissions import (
    IsAuthenticated
)


class BlogViewSet(viewsets.GenericViewSet,
                    mixins.CreateModelMixin,
                    mixins.ListModelMixin):

    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()
    lookup = 'id'

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateBlogModelSerializer
        else:
            return ListModelSerializer

class CommentViewSet(viewsets.GenericViewSet,
                        mixins.CreateModelMixin,
                        mixins.ListModelMixin):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.filter(is_approved=True)
    lookup = 'id'
    def get_serializer_class(self):
        if self.action == 'create':
            return CommentCreate
        else:
            return CommentModelSerializer

