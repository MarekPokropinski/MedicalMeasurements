from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class HeartPressureMeasurement(models.Model):
    date = models.DateTimeField(default=now)
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

class BloodSugarMeasurement(models.Model):
    date = models.DateTimeField(default=now)
    level = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "[{}]: {} {}".format(
            self.date,
            self.user.username,            
            self.level,
        )

    def __repr__(self):
        return str(self)

class BmiMeasurement(models.Model):
    date = models.DateTimeField(default=now)
    height = models.IntegerField()
    weight = models.DecimalField(decimal_places=1, max_digits=5)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "[{}]: {} {} {} {:.2f}".format(
            self.date,
            self.user.username,            
            self.height,
            self.weight,
            float(self.weight)/((self.height/100)**2)
        )

    def __repr__(self):
        return str(self)
