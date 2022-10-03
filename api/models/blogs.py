""" Blog Models """

from django.db import models
from api.models.utils import ApiModel
from api.models.users import User


class Blog(ApiModel):
    title = models.CharField(max_length=400, blank=True, null=True)
    description = models.TextField(max_length=1200, blank=True, null=True)
    cover_image = models.ImageField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    is_news = models.BooleanField(default=True)
    is_communicated = models.BooleanField(default=False)


    def __str__(self):
        return str(self.title)


class Comment(ApiModel):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(max_length=1200, blank=True, null=True)
    response_owner = models.TextField(max_length=1200, blank=True, null=True)
    is_approved = models.BooleanField(default=False)


    def __str__(self):
        return str(self.user)
