import React from "react";
import axios from "../client";
import { withStyles } from "@material-ui/core/styles";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import autobind from "class-autobind";
import { AddCircleRounded } from "@material-ui/icons";
import BmiTable from "./BmiComponents/BmiTable";
import AddBmiMeasurement from "./BmiComponents/AddBmiMeasurement";
import BmiChart from "./BmiComponents/BmiChart";

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

class BmiView extends React.Component {
  state = { data: null, selectedItem: 0, range: "month" };
  constructor() {
    super();
    autobind(this);
  }
  async fetchData(range) {
    const data = (await axios.get(`api/bmi-measurements?date_range=${range}`))
      .data;
    this.setState({ data });
  }

  formatDate(date) {
    // YYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  async addMeasurement(measurement) {
    const { weight, height, date } = measurement;
    await axios.post("api/bmi-measurements", {
      weight,
      height,
      date: this.formatDate(date)
    });
    await this.fetchData(this.state.range);
  }
  async getCategory(measurement) {
    const { weight, height } = measurement;

    return axios.post("api/bmi-measurements/category", {
      weight,
      height
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
        <AddBmiMeasurement
          classes={classes}
          onAdd={this.addMeasurement}
          getCategory={this.getCategory}
        />
      );
    }
    if (selectedItem === 1) {
      subComponent = (
        <BmiTable data={data} range={range} setRange={this.handleChangeRange} />
      );
    }
    if (selectedItem === 2) {
      subComponent = (
        <BmiChart data={data} range={range} setRange={this.handleChangeRange} />
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

export default withStyles(styles)(BmiView);
