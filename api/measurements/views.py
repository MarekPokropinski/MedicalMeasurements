from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import HeartPressureMeasurement, BmiMeasurement, BloodSugarMeasurement
from .serializers import HeartPressureMeasurementSerializer, BmiMeasurementSerializer, BloodSugarMeasurementSerializer
from .permissions import IsOwner


class ListHeartPressureView(generics.ListCreateAPIView):
    queryset = HeartPressureMeasurement.objects.all()
    serializer_class = HeartPressureMeasurementSerializer

    def get_queryset(self):
        return HeartPressureMeasurement.objects.filter(user=self.request.user).order_by("date")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HeartPressureDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HeartPressureMeasurement.objects.all()
    serializer_class = HeartPressureMeasurementSerializer
    permission_classes = [IsOwner]


class ListBloodSugarView(generics.ListCreateAPIView):
    queryset = BloodSugarMeasurement.objects.all()
    serializer_class = BloodSugarMeasurementSerializer

    def get_queryset(self):
        return BloodSugarMeasurement.objects.filter(user=self.request.user).order_by("date")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BloodSugarDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BloodSugarMeasurement.objects.all()
    serializer_class = BloodSugarMeasurementSerializer
    permission_classes = [IsOwner]


class ListBmiMeasurementView(generics.ListCreateAPIView):
    queryset = BmiMeasurement.objects.all()
    serializer_class = BmiMeasurementSerializer

    def get_queryset(self):
        return BmiMeasurement.objects.filter(user=self.request.user).order_by("date")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BmiMeasurementDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BmiMeasurement.objects.all()
    serializer_class = BmiMeasurementSerializer
    permission_classes = [IsOwner]
