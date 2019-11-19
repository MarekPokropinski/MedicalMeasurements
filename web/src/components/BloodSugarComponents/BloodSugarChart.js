import React from "react";
import Plot from "react-plotly.js";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from "@material-ui/core";

export default function BloodSugarChart(props) {
  const { data, range, setRange } = props;

  const timeOptions = ["week", "month", "year"];

  if (data === null) {
    return null;
  }

  const x = data.map(row => row.date);
  const level = data.map(row => row.level);

  const plot = [
    {
      x,
      y: level,
      type: "scatter",
      mode: "lines+points+markers",
      name: "systolic pressure"
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
              title: "Blood sugar",
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
