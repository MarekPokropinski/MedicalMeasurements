# Generated by Django 2.1.7 on 2019-10-29 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measurements', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='measurement',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]