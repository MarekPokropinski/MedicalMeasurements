# Generated by Django 2.2.6 on 2019-10-29 20:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('measurements', '0002_auto_20191029_1429'),
    ]

    operations = [
        migrations.CreateModel(
            name='HeartPressureMeasurement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('systolic_pressure', models.IntegerField()),
                ('diastolic_pressure', models.IntegerField()),
                ('heart_rate', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Measurement',
        ),
    ]
