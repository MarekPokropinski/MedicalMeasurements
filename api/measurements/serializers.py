from rest_framework import serializers
from .models import HeartPressureMeasurement, BloodSugarMeasurement, BmiMeasurement

def get_heart_pressure_category(systolic, diastolic):
    if systolic<=120 and diastolic<=80:
        return "Normal"
    if systolic>160 or diastolic>100:
        return "Stage 2 hypertension"
    if systolic>140 or diastolic>90:
        return "Stage 1 hypertension"
    if systolic>120 or diastolic>80:
        return "Prehypertension"

class HeartPressureMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeartPressureMeasurement
        fields = ("id", "date", "systolic_pressure",
                  "diastolic_pressure", "heart_rate", "user")
        read_only_fields = ("user",)


    def to_representation(self, value):
        ret = super().to_representation(value)
        systolic = int(value.systolic_pressure)
        diastolic = int(value.diastolic_pressure)
        ret["category"] = get_heart_pressure_category(systolic, diastolic)
        return ret

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
