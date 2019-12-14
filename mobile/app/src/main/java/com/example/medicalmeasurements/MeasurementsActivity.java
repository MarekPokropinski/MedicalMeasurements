package com.example.medicalmeasurements;

import android.os.Bundle;

import com.example.medicalmeasurements.ui.bmi.AddBmiFragment;
import com.example.medicalmeasurements.ui.bmi.TableBmiFragment;
import com.example.medicalmeasurements.ui.pressure.AddPressureFragment;
import com.example.medicalmeasurements.ui.pressure.ChartPressureFragment;
import com.example.medicalmeasurements.ui.pressure.TablePressureFragment;
import com.example.medicalmeasurements.ui.sugar.AddSugarFragment;
import com.example.medicalmeasurements.ui.sugar.TableSugarFragment;
import com.google.android.material.bottomnavigation.BottomNavigationItemView;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import android.util.Log;
import android.view.MenuItem;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.google.android.material.navigation.NavigationView;

import androidx.drawerlayout.widget.DrawerLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.view.Menu;
import android.widget.Toast;

import java.io.IOException;
import java.util.List;

public class MeasurementsActivity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private String token;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_measurements);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        apiService = ApiServiceConfig.getApiService();

        final DrawerLayout drawer = findViewById(R.id.drawer_layout);
        final NavigationView navigationView = findViewById(R.id.nav_view);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_pressure, R.id.nav_sugar, R.id.nav_bmi)
                .setDrawerLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);

        BottomNavigationView bottomNav = findViewById(R.id.bottom_navigation);
        bottomNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                Fragment selectedFragment;
                MenuItem drawerItem = navigationView.getCheckedItem();

                int drawerItemId = drawerItem.getItemId();
                int menuItemId = menuItem.getItemId();

                if (drawerItemId == R.id.nav_pressure && menuItemId == R.id.bottom_add) {
                    selectedFragment = new AddPressureFragment();
                } else if (drawerItemId == R.id.nav_pressure && menuItemId == R.id.bottom_table) {
                    selectedFragment = new TablePressureFragment();
                } else if (drawerItemId == R.id.nav_sugar && menuItemId == R.id.bottom_add) {
                    selectedFragment = new AddSugarFragment();
                } else if (drawerItemId == R.id.nav_sugar && menuItemId == R.id.bottom_table) {
                    selectedFragment = new TableSugarFragment();
                } else if (drawerItemId == R.id.nav_bmi && menuItemId == R.id.bottom_add) {
                    selectedFragment = new AddBmiFragment();
                } else if (drawerItemId == R.id.nav_bmi && menuItemId == R.id.bottom_table) {
                    selectedFragment = new TableBmiFragment();
                } else {
                    selectedFragment = null;
                }

                if (selectedFragment != null) {
                    getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, selectedFragment).commit();
                }


                return true;
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.measurements, menu);
        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }

    @Override
    protected void onStart() {
        super.onStart();
        token = getIntent().getStringExtra("token");
    }

    @Override
    public void onAttachFragment(Fragment fragment) {
        if (fragment instanceof AddPressureFragment) {
            AddPressureFragment headlinesFragment = (AddPressureFragment) fragment;
            headlinesFragment.setOnAddListener(new AddPressureFragment.OnAddListener() {
                @Override
                public void onAdd(int sys, int dia, int hr) {
                    Log.i("add pressure", String.format("%d %d %d", sys, dia, hr));

                    apiService.createHeartMeasurement(token, new HeartMeasurement(sys, dia, hr)).enqueue(new Callback<HeartMeasurement>() {
                        @Override
                        public void onResponse(Call<HeartMeasurement> call, Response<HeartMeasurement> response) {
                        }

                        @Override
                        public void onFailure(Call<HeartMeasurement> call, Throwable t) {
                            Log.i("error:", t.getMessage());
                        }
                    });
                }
            });
        } else if (fragment instanceof TablePressureFragment) {
            TablePressureFragment frag = (TablePressureFragment) fragment;
            frag.setGetData(new TablePressureFragment.GetData() {
                @Override
                public Call<List<HeartMeasurement>> getData() {
                    return apiService.getHeartMeasurements(token);
                }
            });
        } else if (fragment instanceof AddSugarFragment) {
            AddSugarFragment frag = (AddSugarFragment) fragment;
            frag.setOnAddListener(new AddSugarFragment.OnAddListener() {
                @Override
                public void onAdd(int level) {
                    apiService.createSugarMeasurement(token, new SugarMeasurement(level)).enqueue(new Callback<SugarMeasurement>() {
                        @Override
                        public void onResponse(Call<SugarMeasurement> call, Response<SugarMeasurement> response) {
                        }

                        @Override
                        public void onFailure(Call<SugarMeasurement> call, Throwable t) {
                            Log.i("error:", t.getMessage());
                        }
                    });
                }
            });
        } else if (fragment instanceof TableSugarFragment) {
            TableSugarFragment frag = (TableSugarFragment) fragment;
            frag.setGetData(new TableSugarFragment.GetData() {
                @Override
                public Call<List<SugarMeasurement>> getData() {
                    return apiService.getSugarLevels(token);
                }
            });
        } else if (fragment instanceof AddBmiFragment) {
            AddBmiFragment frag = (AddBmiFragment) fragment;
            frag.setOnAddListener(new AddBmiFragment.OnAddListener() {
                @Override
                public void onAdd(int weight, int height) {
                    apiService.createBmi(token, new BmiMeasurement(weight, height)).enqueue(new Callback<BmiMeasurement>() {
                        @Override
                        public void onResponse(Call<BmiMeasurement> call, Response<BmiMeasurement> response) {
                        }

                        @Override
                        public void onFailure(Call<BmiMeasurement> call, Throwable t) {
                            Log.i("error:", t.getMessage());
                        }
                    });
                }
            });
        } else if (fragment instanceof TableBmiFragment) {
            TableBmiFragment frag = (TableBmiFragment) fragment;
            frag.setGetData(new TableBmiFragment.GetData() {
                @Override
                public Call<List<BmiMeasurement>> getData() {
                    return apiService.getBmi(token);
                }
            });
        }
    }
}
