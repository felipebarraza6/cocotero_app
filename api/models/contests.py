from django.db import models
from django.db.models.signals import post_save

from api.models.utils import ApiModel
from .courses import Course
from .users import User, ProfileUser
import json

import requests
import requests.packages
requests.packages.urllib3.disable_warnings


class QuestionCourse(ApiModel):
    title = models.CharField(max_length=1000)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Curso - Pregunta'
        verbose_name_plural = 'Cursos - Preguntas'
        ordering = ['created']

    def __str__(self):
        return self.title


class AlternativeQuestion(ApiModel):
    title = models.CharField(max_length=1000)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(QuestionCourse, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Curso - Alternativa'
        verbose_name_plural = 'Curso - Alternativas'
        ordering = ['created']
    
    def __str__(self):
        return self.title


class ResultContest(ApiModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Curso - Resultado de cuestionario'
        verbose_name_plural = 'Cursos - Resultados de cuestionarios'
    
    def __str__(self):
        return str(self.user)


class AnswerQuestion(ApiModel):
    question = models.ForeignKey(QuestionCourse, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(AlternativeQuestion, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Curso - Respuesta'
        verbose_name_plural = 'Cursos - Respuestas'
    
    def __str__(self):
        return str(self.user)


def validate_approved(sender, instance, **kwargs):
    user = ProfileUser.objects.get(user=instance.user)
    user.approved_courses.add(instance)    
        


    




post_save.connect(validate_approved, sender= ResultContest)

