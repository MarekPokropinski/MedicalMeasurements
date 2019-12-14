package com.example.medicalmeasurements;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.example.medicalmeasurements.ui.pressure.AddPressureFragment;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.tasks.Task;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.util.Consumer;
import androidx.fragment.app.Fragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private static final int RC_SIGN_IN = 1;
    private GoogleSignInClient googleClient;
    private String token;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.sign_in_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (v.getId()) {
                    case R.id.sign_in_button:
                        signIn();
                        break;
                }
            }
        });


        apiService = ApiServiceConfig.getApiService();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestServerAuthCode("641328261456-ocqg4rj3butg5308i0ano2n51tgt2fk6.apps.googleusercontent.com")
                .requestProfile()
                .requestEmail()
                .build();
        googleClient = GoogleSignIn.getClient(this, gso);
    }

    private void signIn() {
        Intent signInIntent = googleClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

//    private void getHeartMeasurements() {
//        apiService.getHeartMeasurements(token).enqueue(new Callback<List<HeartMeasurement>>() {
//            @Override
//            public void onResponse(Call<List<HeartMeasurement>> call, Response<List<HeartMeasurement>> response) {
//
//            }
//
//            @Override
//            public void onFailure(Call<List<HeartMeasurement>> call, Throwable t) {
//                Log.w("response fail", t.getMessage());
//            }
//        });
//    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {

        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            login(account);
        } catch (ApiException e) {
            Toast.makeText(getApplicationContext(), "failed to log in", Toast.LENGTH_LONG);
        }

    }

    void login(GoogleSignInAccount account) {
        String code = account.getServerAuthCode();
        if (code == null) {
            return;
        }
        Log.i("code", code);
        apiService.getToken(code).enqueue(new Callback<String>() {

            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                token = "Bearer google-oauth2 " + response.body();
                Log.i("debug", "starting view with token " + token);
                goToMeasurementsView();
                Log.i("debug", "started");

            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                Log.w("login", "fail");
            }
        });
    }

    void goToMeasurementsView() {
        Intent measurementsIntent = new Intent(this, MeasurementsActivity.class);
        measurementsIntent.putExtra("token", token);
        startActivity(measurementsIntent);
    }

    @Override
    protected void onStart() {
        super.onStart();
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this);
        if (account != null) {
            login(account);
        }
    }


}
