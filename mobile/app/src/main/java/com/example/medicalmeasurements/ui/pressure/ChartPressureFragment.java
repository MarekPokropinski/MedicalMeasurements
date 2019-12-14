package com.example.medicalmeasurements.ui.pressure;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.medicalmeasurements.HeartMeasurement;
import com.example.medicalmeasurements.R;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChartPressureFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view =  inflater.inflate(R.layout.fragment_chart_pressure, container, false);
        final ListView lv = view.findViewById(R.id.pressure_list);
        getData.getData().enqueue(new Callback<List<HeartMeasurement>>() {
            @Override
            public void onResponse(Call<List<HeartMeasurement>> call, Response<List<HeartMeasurement>> response) {
                List<HeartMeasurement> measurements = response.body();
                if(measurements==null) {
                    return;
                }
                String[] data = new String[measurements.size()+1];
                data[0]="abc";
                for (int i = 0; i < measurements.size(); i++) {
                    HeartMeasurement hm = measurements.get(i);
                    data[i+1] = String.format("sys: %d, dia: %d, hr: %d", hm.systolic_pressure, hm.diastolic_pressure, hm.heart_rate);
                }
                lv.setAdapter(new ArrayAdapter<String>(getContext(), android.R.layout.simple_list_item_1, data));
            }

            @Override
            public void onFailure(Call<List<HeartMeasurement>> call, Throwable t) {

            }
        });


        return view;
    }

    public interface GetData {
        Call<List<HeartMeasurement>> getData();
    }

    private TablePressureFragment.GetData getData;

    public void setGetData(TablePressureFragment.GetData getData) {
        this.getData = getData;
    }
}
