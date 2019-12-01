import React from "react";
import axios from "../client";
import { withStyles } from "@material-ui/core/styles";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import autobind from "class-autobind";
import { AddCircleRounded } from "@material-ui/icons";
import BloodSugarTable from "./BloodSugarComponents/BloodSugarTable";
import AddSugarMeasurement from "./BloodSugarComponents/AddSugarMeasurement";
import BloodSugarChart from "./BloodSugarComponents/BloodSugarChart";

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
    width: "100%"
  }
});

class BloodSugarView extends React.Component {
  state = { data: null, selectedItem: 0, range: "month" };
  constructor() {
    super();
    autobind(this);
  }
  async fetchData(range) {
    const data = (await axios.get(`api/sugar-measurements?date_range=${range}`))
      .data;
    this.setState({ data });
  }

  formatDate(date) {
    // YYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  async addMeasurement(measurement) {
    const { level, date } = measurement;
    await axios.post("api/sugar-measurements", {
      level,
      date: this.formatDate(date)
    });
    await this.fetchData(this.state.range);
  }
  async getCategory(measurement) {
    return axios.post("api/sugar-measurements/category", measurement);
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
        <AddSugarMeasurement
          classes={classes}
          onAdd={this.addMeasurement}
          getCategory={this.getCategory}
        />
      );
    }
    if (selectedItem === 1) {
      subComponent = (
        <BloodSugarTable
          data={data}
          range={range}
          setRange={this.handleChangeRange}
        />
      );
    }
    if (selectedItem === 2) {
      subComponent = (
        <BloodSugarChart
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

export default withStyles(styles)(BloodSugarView);
