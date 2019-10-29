from rest_framework import serializers
from .models import HeartPressureMeasurement


class HeartPressureMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeartPressureMeasurement
        fields = ("id", "date", "systolic_pressure",
                  "diastolic_pressure", "heart_rate", "user")
        read_only_fields = ("date", "user")
