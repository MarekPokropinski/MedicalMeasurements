package com.example.medicalmeasurements.ui.sugar;

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


public class AddSugarFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_add_sugar, container, false);
        Button button = (Button) view.findViewById(R.id.button_add_sugar);
        final TextView level = (TextView) view.findViewById(R.id.level);


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int l = Integer.parseInt(level.getText().toString());
                onAddListener.onAdd(l);
                level.setText("");
            }
        });
        return view;
    }

    private OnAddListener onAddListener;

    public interface OnAddListener {
        void onAdd(int level);
    }

    public void setOnAddListener(OnAddListener onAddListener) {
        this.onAddListener = onAddListener;
    }
}
