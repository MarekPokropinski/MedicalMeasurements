import React, { useState } from "react";
import axios from "../client";
import { withStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Plot from "react-plotly.js";
import {
  BottomNavigation,
  BottomNavigationAction,
  FormGroup,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid
} from "@material-ui/core";
import autobind from "class-autobind";
import { AddCircleRounded } from "@material-ui/icons";
import HeartPressureTable from "./HeartPressureComponents/HeartPressureTable";
import getRowColor from "./HeartPressureComponents/getRowColor";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden"
  },
  container: {
    height: "calc(100% - 56px)",
    position: "relative",
    overflowY: "auto"
  },
  bottomNavigation: {
    position: "sticky",
    bottom: 0,
    padding: "0 auto",
    // left: "50%",
    width: "100%"
  },
  addForm: {
    width: "100%",
    height: "100%",
    // padding: "20% 0",
    // margin: "0 auto",
    position: "relative",
    overflow: "hidden"
  },
  addForm_formControl: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid blue",
    padding: "30px",
    borderRadius: "5px"
  },
  addForm_addButton: {
    marginTop: "20px"
  }
});

function AddHeartPressureMeasurement(props) {
  const { onAdd, classes, getCategory } = props;
  const [state, setState] = useState({
    sys: 0,
    dia: 0,
    hr: 0,
    date: new Date()
  });
  const [category, setCategory] = useState("");

  async function checkCategory(measurement) {
    const response = await getCategory(measurement);
    setCategory(response.data);
  }

  return (
    <div className={classes.addForm}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormGroup className={classes.addForm_formControl}>
          <TextField
            label="Systolic"
            value={state.sys}
            onChange={event => {
              const newState = { ...state, sys: event.target.value };
              setState(newState);
              checkCategory(newState);
            }}
            // endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
            inputProps={{
              step: 1,
              min: 0,
              max: 1000,
              type: "number"
            }}
          />

          <TextField
            label="Diastolic"
            value={state.dia}
            onChange={event => {
              const newState = { ...state, dia: event.target.value };
              setState(newState);
              checkCategory(newState);
            }}
            // endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
            inputProps={{
              step: 1,
              min: 0,
              max: 1000,
              type: "number"
            }}
          />

          <TextField
            label="Heart Rate"
            value={state.hr}
            onChange={event => setState({ ...state, hr: event.target.value })}
            // endAdornment={<InputAdornment position="end">bpm</InputAdornment>}
            inputProps={{
              step: 1,
              min: 0,
              max: 1000,
              type: "number"
            }}
          />

          <TextField
            inputProps={{
              style: { backgroundColor: getRowColor(category) }
            }}
            label="Category"
            value={category}
            disabled
          />

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker"
            label="Date"
            value={state.date}
            onChange={date => setState({ ...state, date })}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time"
            value={state.date}
            onChange={date => setState({ ...state, date })}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
          <Button
            className={classes.addForm_addButton}
            variant="contained"
            color="primary"
            onClick={() => onAdd(state)}
          >
            Add
          </Button>
        </FormGroup>
      </MuiPickersUtilsProvider>
    </div>
  );
}

function HeartPressureChart(props) {
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

class HeartPressureView extends React.Component {
  state = { data: null, selectedItem: 0, range: "month" };
  constructor() {
    super();
    autobind(this);
  }
  async fetchData(range) {
    const data = (await axios.get(`api/heart-measurements?date_range=${range}`))
      .data;
    this.setState({ data });
  }

  formatDate(date) {
    // YYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  async addMeasurement(measurement) {
    const { sys, dia, hr, date } = measurement;
    await axios.post("api/heart-measurements", {
      systolic_pressure: sys,
      diastolic_pressure: dia,
      heart_rate: hr,
      date: this.formatDate(date)
    });
    await this.fetchData(this.state.range);
  }
  async getCategory(measurement) {
    const { sys, dia, hr } = measurement;
    const systolic_pressure = sys;
    const diastolic_pressure = dia;
    const heart_rate = hr;
    return axios.post("api/heart-measurements/category", {
      systolic_pressure,
      diastolic_pressure,
      heart_rate
    });
  }
  componentDidMount() {
    this.fetchData("month");
  }
  handleChangeRange(newRange) {
    this.setState({ range: newRange });
    this.fetchData(newRange);
  }
  render() {
    const { data, selectedItem, range } = this.state;
    const { classes } = this.props;

    let subComponent = null;
    if (selectedItem === 0) {
      subComponent = (
        <AddHeartPressureMeasurement
          classes={classes}
          onAdd={this.addMeasurement}
          getCategory={this.getCategory}
        />
      );
    }
    if (selectedItem === 1) {
      subComponent = <HeartPressureTable data={data} />;
    }
    if (selectedItem === 2) {
      subComponent = (
        <HeartPressureChart
          data={data}
          range={range}
          setRange={this.handleChangeRange}
        />
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>{subComponent}</div>

        <BottomNavigation
          className={classes.bottomNavigation}
          value={selectedItem}
          onChange={(_event, newValue) => {
            this.setState({ selectedItem: newValue });
          }}
          showLabels
        >
          <BottomNavigationAction label="Add" icon={<AddCircleRounded />} />
          <BottomNavigationAction label="Table" icon={<AddCircleRounded />} />
          <BottomNavigationAction label="Chart" icon={<AddCircleRounded />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(styles)(HeartPressureView);
