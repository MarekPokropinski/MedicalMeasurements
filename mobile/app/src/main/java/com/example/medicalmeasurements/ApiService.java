package com.example.medicalmeasurements;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiService {
    @GET("/api/heart-measurements")
    Call<List<HeartMeasurement>> getHeartMeasurements(@Header("Authorization") String token);

    @POST("/api/credentials")
    Call<String> getToken(@Query("code") String code);
}
