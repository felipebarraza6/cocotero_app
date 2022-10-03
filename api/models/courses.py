from django.db import models
from api.models.utils import ApiModel
from api.models.users import User


class Course(ApiModel):
    id = models.CharField(max_length=300, primary_key=True, editable=True)
    title = models.CharField(max_length=200)
    image = models.ImageField(blank=True, null=True)
    description = models.CharField(max_length=400, blank=True, null=True)
    extra_txt = models.CharField(max_length=220, blank=True, null=True)
    description_promotional = models.CharField(max_length=400, blank=True, null=True)
    promotional_video = models.CharField(max_length=2000, blank=True, null=True)
    is_free = models.BooleanField(default=False)
    file_promotional = models.FileField(blank=True, null=True)
    authorized_user = models.ManyToManyField(User, blank=True,
            related_name="authorized_user_course", null=True)


    class Meta:
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'
        ordering = ['created']

    def __str__(self):
        return self.title


class PreRequisite(ApiModel):
    course = models.OneToOneField(Course, on_delete=models.CASCADE,
            related_name='course_affect')
    pre_requisite = models.OneToOneField(Course, on_delete=models.CASCADE,
            related_name='course_prerequisit')

    class Meta:
        verbose_name = 'Curso - Pre requisito'
        verbose_name_plural = 'Cursos - Pre requisitos'

    def __str__(self):
        return str(self.course)


class Module(ApiModel):
    title = models.CharField(max_length=200)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    description = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        verbose_name = 'Curso - Modulo'
        verbose_name_plural = 'Cursos - Modulos'
        ordering = ['created']

    def __str__(self):
        return self.title
    

class Video(ApiModel):
    title = models.CharField(max_length=200)
    module = models.ForeignKey(Module, on_delete=models.CASCADE, blank=True, null=True)
    url = models.URLField(max_length=1000, blank=True, null=True)
    url_telegram_group = models.URLField(max_length=3000, blank=True, null=True)
    img_presencial = models.ImageField(blank=True, null=True)
    is_presencial = models.BooleanField(default=False)
    is_challenge = models.BooleanField(default=False)
    description_challenge = models.TextField(max_length=1200, blank=True, null=True)
    description_presencial = models.TextField(max_length=1200, blank=True, null=True)
    
    class Meta: 
        verbose_name = 'Curso - Video/Presencial/Desafio'
        verbose_name_plural = 'Cursos - Videos/Presenciales/Desafios'
        ordering = ['created']

    def __str__(self):
        return self.title

class ChallengeSendForUser(ApiModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    url_file = models.CharField(max_length=3000, blank=True, null=True)

    def __str__(self):
        return str(self.user)


class ViewVideo(ApiModel):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.video)


class Resource(ApiModel):
    title = models.CharField(max_length=200)
    class_video = models.ForeignKey(Video, on_delete=models.CASCADE, blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=True, null=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE, blank=True)
    file_re = models.FileField(upload_to='uploads/resources/')
    
    class Meta:
        verbose_name = 'Curso - Recurso'
        verbose_name_plural = 'Cursos -Recursos'
        ordering = ['created']

    def __str__(self):
        return self.title

