import React from "react";
import Plot from "react-plotly.js";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from "@material-ui/core";

export default function HeartPressureChart(props) {
  const { data, range, setRange } = props;

  const timeOptions = ["week", "month", "year"];

  if (data === null) {
    return null;
  }

  const x = data.map(row => row.date);
  const sys = data.map(row => row.systolic_pressure);
  const dia = data.map(row => row.diastolic_pressure);
  const hr = data.map(row => row.heart_rate);

  const plot = [
    {
      x,
      y: sys,
      type: "scatter",
      mode: "lines+points+markers",
      name: "systolic pressure"
    },
    {
      x,
      y: dia,
      type: "scatter",
      mode: "lines+points+markers",
      name: "diastolic pressure"
    },
    {
      x,
      y: hr,
      type: "scatter",
      mode: "lines+points+markers",
      name: "heart rate"
    }
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Plot
            style={{ width: "100%" }}
            data={plot}
            useResizeHandler
            layout={{
              title: "Heart pressure",
              autosize: true,
              showlegend: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel>Time</InputLabel>
            <Select
              value={range}
              onChange={event => setRange(event.target.value)}
            >
              {timeOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
