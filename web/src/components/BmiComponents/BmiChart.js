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
  const weight = data.map(row => row.weight);
  const height = data.map(row => row.height);
  const bmi = data.map(row => row.bmi);

  const plot = [
    {
      x,
      y: weight,
      type: "scatter",
      mode: "lines+points+markers",
      name: "weight"
    },
    {
      x,
      y: height,
      type: "scatter",
      mode: "lines+points+markers",
      name: "height"
    },
    {
      x,
      y: bmi,
      type: "scatter",
      mode: "lines+points+markers",
      name: "bmi"
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
