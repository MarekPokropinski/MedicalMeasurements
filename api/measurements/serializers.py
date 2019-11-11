from rest_framework import serializers
from .models import HeartPressureMeasurement, BloodSugarMeasurement, BmiMeasurement


class HeartPressureMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeartPressureMeasurement
        fields = ("id", "date", "systolic_pressure",
                  "diastolic_pressure", "heart_rate", "user")
        read_only_fields = ("date", "user")


class BloodSugarMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodSugarMeasurement
        fields = ("id", "date", "level")
        read_only_fields = ("date", "user")


class BmiMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BmiMeasurement
        fields = ("id", "date", "weight", "height")
        read_only_fields = ("date", "user")

    def to_representation(self, value):
        ret = super().to_representation(value)
        weight = float(value.weight)
        height = value.height/100
        ret["bmi"] = weight/(height**2)
        return ret
