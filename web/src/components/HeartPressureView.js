import React from "react";
import axios from "../client";
import { withStyles } from "@material-ui/core/styles";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import autobind from "class-autobind";
import { AddCircleRounded } from "@material-ui/icons";
import HeartPressureTable from "./HeartPressureComponents/HeartPressureTable";
import AddHeartPressureMeasurement from "./HeartPressureComponents/AddHeartPressureMeasurement";
import HeartPressureChart from "./HeartPressureComponents/HeartPressureChart";

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
  }
});

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
