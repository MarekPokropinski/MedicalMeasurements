package com.example.medicalmeasurements;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiService {
    @GET("/api/heart-measurements")
    Call<List<HeartMeasurement>> getHeartMeasurements(@Header("Authorization") String token);

    @POST("/api/heart-measurements")
    Call<HeartMeasurement> createHeartMeasurement(@Header("Authorization") String token, @Body HeartMeasurement heartMeasurement);

    @GET("/api/sugar-measurements")
    Call<List<SugarMeasurement>> getSugarLevels(@Header("Authorization") String token);

    @POST("/api/sugar-measurements")
    Call<SugarMeasurement> createSugarMeasurement(@Header("Authorization") String token, @Body SugarMeasurement sugarMeasurement);

    @GET("/api/bmi-measurements")
    Call<List<BmiMeasurement>> getBmi(@Header("Authorization") String token);

    @POST("/api/bmi-measurements")
    Call<BmiMeasurement> createBmi(@Header("Authorization") String token, @Body BmiMeasurement sugarMeasurement);

    @POST("/api/credentials")
    Call<String> getToken(@Query("code") String code);
}
