from django.urls import path
from .views import (
    ListHeartPressureView,
    HeartPressureDetailsView,
    ListBmiMeasurementView,
    BmiMeasurementDetailsView,
    ListBloodSugarView,
    BloodSugarDetailsView,
    HeartPressureCategoryView
)

urlpatterns = [
    path('heart-measurements', ListHeartPressureView.as_view()),
    path('heart-measurements/<int:pk>', HeartPressureDetailsView.as_view()),
    path('heart-measurements/category', HeartPressureCategoryView.as_view()),
    path('bmi-measurements', ListBmiMeasurementView.as_view()),
    path('bmi-measurements/<int:pk>', BmiMeasurementDetailsView.as_view()),
    path('sugar-measurements', ListBloodSugarView.as_view()),
    path('sugar-measurements/<int:pk>', BloodSugarDetailsView.as_view()),
]
