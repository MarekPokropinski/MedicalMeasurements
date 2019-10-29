from django.db import models
from django.contrib.auth.models import User


class HeartPressureMeasurement(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    systolic_pressure = models.IntegerField()
    diastolic_pressure = models.IntegerField()
    heart_rate = models.IntegerField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "[{}]: {} {} {}".format(
            self.date,
            self.systolic_pressure,
            self.diastolic_pressure,
            self.heart_rate,
        )

    def __repr__(self):
        return str(self)
