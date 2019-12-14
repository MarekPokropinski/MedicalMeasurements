package com.example.medicalmeasurements;

import java.text.SimpleDateFormat;
import java.util.Date;

public class BmiMeasurement {
    public long id;
    public String date;
    public long weight;
    public long height;
    public float bmi;
    public long user;


    public BmiMeasurement(int weight, int height) {
        this.weight = weight;
        this.height = height;

        SimpleDateFormat dt = new SimpleDateFormat("YYYY-MM-dd hh:mm:ss.uuuuuu");
        this.date = dt.format(new Date());
        String[] strings = this.date.split(" ");
        this.date = strings[0] + "T" + strings[1];
    }
}
