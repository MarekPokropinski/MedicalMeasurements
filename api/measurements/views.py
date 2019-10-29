from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import HeartPressureMeasurement
from .serializers import HeartPressureMeasurementSerializer
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
