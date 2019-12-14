package com.example.medicalmeasurements.ui.pressure;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.ScrollView;

import com.example.medicalmeasurements.HeartMeasurement;
import com.example.medicalmeasurements.R;

import java.util.List;
import java.util.stream.Collectors;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TablePressureFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_table_pressure, container, false);

        final ListView lv = view.findViewById(R.id.pressure_list);
        getData.getData().enqueue(new Callback<List<HeartMeasurement>>() {
            @Override
            public void onResponse(Call<List<HeartMeasurement>> call, Response<List<HeartMeasurement>> response) {
                List<HeartMeasurement> measurements = response.body();
                if(measurements==null) {
                    return;
                }
                String[] data = new String[measurements.size()];
                for (int i = 0; i < measurements.size(); i++) {
                    HeartMeasurement hm = measurements.get(i);
                    data[i] = String.format("sys: %d, dia: %d, hr: %d", hm.systolic_pressure, hm.diastolic_pressure, hm.heart_rate);
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

    private GetData getData;

    public void setGetData(GetData getData) {
        this.getData = getData;
    }
}
