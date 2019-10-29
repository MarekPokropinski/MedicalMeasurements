from django.urls import path
from .views import ListHeartPressureView, HeartPressureDetailsView

urlpatterns = [
    path('', ListHeartPressureView.as_view()),
    path('<int:pk>', HeartPressureDetailsView.as_view()),
]
