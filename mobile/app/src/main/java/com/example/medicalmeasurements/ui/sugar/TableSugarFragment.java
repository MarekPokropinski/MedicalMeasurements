package com.example.medicalmeasurements.ui.sugar;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.medicalmeasurements.HeartMeasurement;
import com.example.medicalmeasurements.R;
import com.example.medicalmeasurements.SugarMeasurement;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TableSugarFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_table_sugar, container, false);

        final ListView lv = view.findViewById(R.id.sugar_list);
        getData.getData().enqueue(new Callback<List<SugarMeasurement>>() {
            @Override
            public void onResponse(Call<List<SugarMeasurement>> call, Response<List<SugarMeasurement>> response) {
                List<SugarMeasurement> measurements = response.body();
                if(measurements==null) {
                    return;
            }
                String[] data = new String[measurements.size()];
                for (int i = 0; i < measurements.size(); i++) {
                    SugarMeasurement m = measurements.get(i);
                    data[i] = String.format("sugar level: %d", m.level);
                }
                lv.setAdapter(new ArrayAdapter<String>(getContext(), android.R.layout.simple_list_item_1, data));
            }

            @Override
            public void onFailure(Call<List<SugarMeasurement>> call, Throwable t) {
            }
        });


        return view;
    }

    public interface GetData {
        Call<List<SugarMeasurement>> getData();
    }

    private GetData getData;

    public void setGetData(GetData getData) {
        this.getData = getData;
    }
}
