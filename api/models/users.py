"""User Model."""

# Django
from django.db import models 
from django.contrib.auth.models import AbstractUser

# Utilities
from .utils import ApiModel


class User(ApiModel, AbstractUser):

    email = models.EmailField(
        'email',
        unique = True,
    )

    phone_number = models.IntegerField('phone', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    is_student = models.BooleanField(default=False)
    
    class Meta:
        verbose_name='Usuario'
        verbose_name_plural='Usuarios'

    def __str__(self):
        return self.username
    
    def get_short_name(self):
        return self.username


class ProfileUser(ApiModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    approved_courses = models.ManyToManyField('api.ResultContest',
            related_name='user_aproved_courses', blank=True, null=True)
    tests_performed = models.ManyToManyField('api.ResultTest',
            related_name='user_result_test', blank=True)
    shop_courses = models.ManyToManyField('api.Course',
            related_name='user_shop_courses', blank=True)

    
    class Meta:
        verbose_name = 'Usuario - Perfil'
        verbose_name_plural = 'Usuarios - Perfiles'
    
    def __str__(self):
        return str(self.user)

