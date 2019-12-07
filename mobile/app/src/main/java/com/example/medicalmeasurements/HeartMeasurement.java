package com.example.medicalmeasurements;

class HeartMeasurement {
    public long id;
    public String date;
    public long systolic_pressure;
    public long diastolic_pressure;
    public long heart_rate;
    public long user;

    public String toString(){
        return String.format("HeartMeasurement: id: %d, sys: %d, dia: %d, hr: %d, date: %s",id,systolic_pressure,diastolic_pressure,heart_rate, date);
    }
}
