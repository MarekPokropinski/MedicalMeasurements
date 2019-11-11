from django.contrib import admin
from .models import HeartPressureMeasurement, BloodSugarMeasurement, BmiMeasurement

admin.site.register(HeartPressureMeasurement)
admin.site.register(BloodSugarMeasurement)
admin.site.register(BmiMeasurement)