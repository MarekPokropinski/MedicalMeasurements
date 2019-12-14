package com.example.medicalmeasurements;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SugarMeasurement {
    public long id;
    public String date;
    public long level;

    public long user;


    public SugarMeasurement(int level) {
        this.level = level;
        SimpleDateFormat dt = new SimpleDateFormat("YYYY-MM-dd hh:mm:ss.uuuuuu");
        this.date = dt.format(new Date());
        String[] strings = this.date.split(" ");
        this.date = strings[0] + "T" + strings[1];
    }
}
