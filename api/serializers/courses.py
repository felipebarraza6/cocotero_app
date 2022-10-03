from rest_framework import serializers
from api.models import (Course, ViewVideo, Resource, Video, QuestionCourse,
AlternativeQuestion, ResultContest, AnswerQuestion, PreRequisite, Module)

from api.serializers import UserModelSerializer



class ResultContestOnly(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = ResultContest
        fields = '__all__'

    def validate(self, data):
        course = data['course']
        user = data['user']
        
        ResultContest.objects.create(
            course = course,
            user = user,
            is_approved = True
        )
    
        return data

class ResultContestModelSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    answers = serializers.ListField()
    class Meta:
        model = ResultContest
        fields = '__all__'

    def validate(self, data):
        course = data['course']
        user = data['user']

        if 'answers' in data:
            list_answers = data['answers']
            for answer in list_answers:
                get_question_instance = QuestionCourse.objects.filter(id=answer['question']).first()
                get_answer_instance = AlternativeQuestion.objects.filter(id=answer['answer']).first()
                
                AnswerQuestion.objects.create(
                    user = data['user'],
                    question = get_question_instance,
                    answer = get_answer_instance
                )

        ResultContest.objects.create(
            course = course,
            user = user,
            is_approved = True
        )

        return data 


class ViewVideoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewVideo
        fields = '__all__'

class AlertnativeQuestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlternativeQuestion
        fields = (
            'id',
            'title',
            'is_correct'
        )


class QuestionCourseModelSerializer(serializers.ModelSerializer):
    alternatives = serializers.SerializerMethodField('get_alternatives')
    
    def get_alternatives(self, question):
        qs = AlternativeQuestion.objects.filter(question=question)
        serializer = AlertnativeQuestionModelSerializer(instance=qs, many
                = True)
        data = serializer.data

        return data

    class Meta:
        model=QuestionCourse
        fields = (
            'id',
            'title',
            'alternatives'
        )

class ResourceModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Resource
        fields = (
            'title',
            'file_re'
        )

class VideoModelSerializer(serializers.ModelSerializer):
    resources = serializers.SerializerMethodField('get_resources')
    
    def get_resources(self, video):
        qs = Resource.objects.filter(class_video=video.id)
        serializer = ResourceModelSerializer(instance =qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model=Video
        fields = (
            'id',
            'title',
            'url',
            'resources'
        )

class ModuleModelSerializer(serializers.ModelSerializer):
    videos = serializers.SerializerMethodField('get_videos')

    def get_videos(self, module):
        qs = Video.objects.filter(module=module.id)
        serializer = VideoModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model = Module
        fields = '__all__'


class PreRequisiteModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreRequisite
        fields = ('pre_requisite',)


class ListCourseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__' 


class RetrieveCourseModelSerializer(serializers.ModelSerializer):
    modules = serializers.SerializerMethodField('get_modules')
    questions = serializers.SerializerMethodField('get_questions')

    def get_questions(self, course):
        qs = QuestionCourse.objects.filter(course=course.id)
        serializer = QuestionCourseModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data


    def get_modules(self, course):
        qs = Module.objects.filter(course=course.id)
        serializer = ModuleModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model=Course
        fields = (
            'id',
            'title',
            'image',
            'description',
            'extra_txt',
            'modules',
            'questions',
            'promotional_video',
            'description_promotional',
            'file_promotional',
            'authorized_user',
            'is_free'
        )


class RetrieveViewVideo(serializers.ModelSerializer):
    course = ListCourseModelSerializer()
    video = VideoModelSerializer()
    user = UserModelSerializer()
    class Meta:
        model = ViewVideo
        fields = '__all__'


class CourseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'






