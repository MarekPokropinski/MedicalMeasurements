package com.example.medicalmeasurements.ui.pressure;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.example.medicalmeasurements.R;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public class AddPressureFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_add_pressure, container, false);
        Button button = (Button) view.findViewById(R.id.button_add_pressure);
        final TextView systolicPressure = (TextView) view.findViewById(R.id.systolic);
        final TextView diastolicPressure = (TextView) view.findViewById(R.id.diastolic);
        final TextView heartRate = (TextView) view.findViewById(R.id.heart_rate);


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int sys = Integer.parseInt(systolicPressure.getText().toString());
                int dia = Integer.parseInt(diastolicPressure.getText().toString());
                int hr = Integer.parseInt(heartRate.getText().toString());

                onAddListener.onAdd(sys, dia, hr);

                systolicPressure.setText("");
                diastolicPressure.setText("");
                heartRate.setText("");
            }
        });
        return view;
    }

    private OnAddListener onAddListener;

    public interface OnAddListener {
        void onAdd(int sys, int dia, int hr);
    }

    public void setOnAddListener(OnAddListener onAddListener) {
        this.onAddListener = onAddListener;
    }
}
