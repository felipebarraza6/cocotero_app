from rest_framework import serializers
from api.models import Blog, Comment
from api.serializers import UserModelSerializer


class CommentModelSerializer(serializers.ModelSerializer):

    user = UserModelSerializer() 
    class Meta:
        model = Comment
        fields = '__all__'

class CommentCreate(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ListModelSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField('get_comments')

    def get_comments(self, blog):
        qs = Comment.objects.filter(blog=blog, is_approved=True)
        serializer = CommentModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model = Blog
        fields = '__all__'


class CreateBlogModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
