from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

from api.serializers import (RetrieveCourseModelSerializer,
ResultContestModelSerializer, ListCourseModelSerializer,
ViewVideoModelSerializer, RetrieveViewVideo, CourseModelSerializer,
ResultContestOnly)
from api.models import Course, ResultContest, ViewVideo
from django_filters import rest_framework as filters



class ViewVideoViewSet(viewsets.GenericViewSet,
                        mixins.CreateModelMixin,
                        mixins.ListModelMixin):

    permission_classes = [IsAuthenticated]
    queryset = ViewVideo.objects.all()
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveViewVideo
        else:
            return ViewVideoModelSerializer

    class ViewVideoFilters(filters.FilterSet):
        class Meta:
            model = ViewVideo
            fields = {
                'video': ['exact'],
                'user': ['exact'],
                'course': ['exact']
            }
    filterset_class = ViewVideoFilters

    
class CourseViewSet(viewsets.GenericViewSet,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin):

    permission_classes = [AllowAny]    
    queryset = Course.objects.all()
    lookup = 'id'
    filter_backends = (filters.DjangoFilterBackend,)

    def get_serializer_class(self):
        if self.action == 'list':
            return ListCourseModelSerializer
        if self.action == 'retrieve':
            return RetrieveCourseModelSerializer
        if self.action == 'finish':
            return ResultContestModelSerializer
        if self.action == 'finish_only':
            return ResultContestOnly 
        else:
            return CourseModelSerializer

    class CourseFilters(filters.FilterSet):
        class Meta:
            model = Course
            fields = {
                'is_free': ['exact'],
                'authorized_user': ['exact', 'contains']
            }

    filterset_class = CourseFilters
    
    @action(detail=True, methods=['post'])
    def finish_only(self, request, *args, **kwargs):
        course = self.get_object() 

        data_add = request.data
        data_add['course'] = course.id

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            course,
            data=data_add,
            context = self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        course = serializer.save()
        return Response({'status': 'OK'}, status=status.HTTP_200_OK)



    @action(detail=True, methods=['post'])
    def finish(self, request, *args, **kwargs):
        course = self.get_object() 

        data_add = request.data
        data_add['course'] = course.id

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            course,
            data=data_add,
            context = self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        course = serializer.save()
        return Response({'status': 'OK'}, status=status.HTTP_200_OK)


