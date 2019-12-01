from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import HeartPressureMeasurement, BmiMeasurement, BloodSugarMeasurement
from .serializers import (
    HeartPressureMeasurementSerializer,
    BmiMeasurementSerializer,
    BloodSugarMeasurementSerializer,
    get_heart_pressure_category,
    get_blood_sugar_category,
    get_bmi_category)
from .permissions import IsOwner
import datetime


def getFilteredQueryset(view, model):
    queryset = model.objects.filter(
        user=view.request.user).order_by("-date")
    date_range = view.request.query_params.get('date_range', None)
    if date_range is not None:
        end = datetime.datetime.now()
        if date_range == 'week':
            delta = 7
        elif date_range == 'month':
            delta = 31
        elif date_range == 'year':
            delta = 365
        else:
            return queryset
        start = end - datetime.timedelta(delta)
        queryset = queryset.filter(date__range=(start, end))
    return queryset


class ListHeartPressureView(generics.ListCreateAPIView):
    serializer_class = HeartPressureMeasurementSerializer

    def get_queryset(self):
        return getFilteredQueryset(self, HeartPressureMeasurement)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HeartPressureCategoryView(generics.GenericAPIView):
    serializer_class = HeartPressureMeasurementSerializer

    def post(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            return Response(get_heart_pressure_category(data['systolic_pressure'], data['diastolic_pressure']))
        else:
            return Response(status=400)


class HeartPressureDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HeartPressureMeasurement.objects.all()
    serializer_class = HeartPressureMeasurementSerializer
    permission_classes = [IsOwner]


class ListBloodSugarView(generics.ListCreateAPIView):
    serializer_class = BloodSugarMeasurementSerializer

    def get_queryset(self):
        return getFilteredQueryset(self, BloodSugarMeasurement)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BloodSugarCategoryView(generics.GenericAPIView):
    serializer_class = BloodSugarMeasurementSerializer

    def post(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            return Response(get_blood_sugar_category(data['level']))
        else:
            return Response(status=400)


class BloodSugarDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BloodSugarMeasurement.objects.all()
    serializer_class = BloodSugarMeasurementSerializer
    permission_classes = [IsOwner]


class ListBmiMeasurementView(generics.ListCreateAPIView):
    serializer_class = BmiMeasurementSerializer

    def get_queryset(self):
        return getFilteredQueryset(self, BmiMeasurement)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BmiCategoryView(generics.GenericAPIView):
    serializer_class = BmiMeasurementSerializer

    def post(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            if data['height']<10:
                return Response(status=400)            
            return Response(get_bmi_category(float(data['weight'])/((data['height']/100)**2)))
        else:
            return Response(status=400)

class BmiMeasurementDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BmiMeasurement.objects.all()
    serializer_class = BmiMeasurementSerializer
    permission_classes = [IsOwner]
