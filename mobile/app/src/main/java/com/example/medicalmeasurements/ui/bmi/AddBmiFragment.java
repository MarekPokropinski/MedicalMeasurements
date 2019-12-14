package com.example.medicalmeasurements.ui.bmi;

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


public class AddBmiFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_add_bmi, container, false);
        Button button = (Button) view.findViewById(R.id.button_add_bmi);
        final TextView weightText = (TextView) view.findViewById(R.id.weight);
        final TextView heightText = (TextView) view.findViewById(R.id.height);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int weight = Integer.parseInt(weightText.getText().toString());
                int height = Integer.parseInt(heightText.getText().toString());
                onAddListener.onAdd(weight, height);
                weightText.setText("");
                heightText.setText("");
            }
        });
        return view;
    }

    private OnAddListener onAddListener;

    public interface OnAddListener {
        void onAdd(int weight, int height);
    }

    public void setOnAddListener(OnAddListener onAddListener) {
        this.onAddListener = onAddListener;
    }
}
