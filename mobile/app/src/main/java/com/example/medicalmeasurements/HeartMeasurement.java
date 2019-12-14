package com.example.medicalmeasurements;

import android.util.Log;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class HeartMeasurement {
    public long id;
    public String date;
    public long systolic_pressure;
    public long diastolic_pressure;
    public long heart_rate;
    public long user;

    public String toString() {
        return String.format("HeartMeasurement: id: %d, sys: %d, dia: %d, hr: %d, date: %s", id, systolic_pressure, diastolic_pressure, heart_rate, date);
    }

    public HeartMeasurement(int systolic_pressure, int diastolic_pressure, int heart_rate) {
        this.systolic_pressure = systolic_pressure;
        this.diastolic_pressure = diastolic_pressure;
        this.heart_rate = heart_rate;
        SimpleDateFormat dt = new SimpleDateFormat("YYYY-MM-dd hh:mm:ss.uuuuuu");
        this.date = dt.format(new Date());
        String[] strings = this.date.split(" ");
        this.date = strings[0] + "T" + strings[1];
    }
}
