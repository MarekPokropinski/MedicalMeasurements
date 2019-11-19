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

def get_blood_sugar_category(level):
    # level in mg/dL
    if level < 50:
        return "Dangerously low"
    if level < 70:
        return "Low"
    if level < 108 :
        return "Normal"
    if level < 150:
        return "Borderline"
    if level < 280:
        return "High"
    else:
        return "Dangerous high"

def get_bmi_category(bmi):
    if bmi < 16:
        return "Severely underweight"
    if bmi < 18.5:
        return "Underweight"
    if bmi < 25 :
        return "Normal"
    if bmi < 30:
        return "Overweight"
    if bmi < 35:
        return "Moderately obese"
    if bmi < 40:
        return "Severely obese"
    if bmi < 45 :
        return "Very severely obese"
    if bmi < 50:
        return "Morbidly obese"
    if bmi < 60:
        return "Super obese"
    else:
        return "Hyper obese"

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
        read_only_fields = ("user",)

    def to_representation(self, value):
        ret = super().to_representation(value)
        level = int(value.level)
        ret["category"] = get_blood_sugar_category(level)
        return ret


class BmiMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BmiMeasurement
        fields = ("id", "date", "weight", "height")
        read_only_fields = ("user",)

    def to_representation(self, value):
        ret = super().to_representation(value)
        weight = float(value.weight)
        height = value.height/100
        bmi = weight/(height**2)
        ret["bmi"] = bmi
        ret["category"] = get_bmi_category(bmi)
        return ret
