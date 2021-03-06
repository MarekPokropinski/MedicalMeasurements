import React from "react";
import { Tabs, Tab, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import HeartPressureView from "./HeartPressureView";
import BloodSugarView from "./BloodSugarView";
import BmiView from "./BmiView";
import autobind from "class-autobind";

const styles = theme => ({
  root: {
    display: "flex",
    background: theme.palette.background.paper,
    width: "100vw"
  },
  tabs_container: {
    background: theme.palette.background.default,
    borderRight: "1px solid " + theme.palette.secondary.dark,
    height: "100vh",
    maxWidth: "250px"
  },
  tabs: {
    height: "calc(100vh - 50px)"
  },
  tabpanel: {
    height: "100vh",
    overflowY: "hidden",
    width: "100%"
  },
  tabTitle: {
    borderBottom: "2px solid white",
    fontSize: "1.5rem",
    color: theme.palette.text.primary
  },
  tab: {
    color: theme.palette.text.primary
  },
  switch: {
    margin: "0 auto 0 auto",
    color: theme.palette.text.primary
  }
});

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

class MeasurementsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 1
    };
    this.routes = ["/pressure/", "/sugar/", "/bmi/"];
    autobind(this);
  }

  logout() {
    localStorage.removeItem("token");
    this.props.history.push("/");
    this.props.onLogout();
  }

  setPage(page) {
    this.setState({ selectedTab: page });
    return null;
  }

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;

    let SubComponent;
    if (selectedTab === 1) {
      SubComponent = HeartPressureView;
    } else if (selectedTab === 2) {
      SubComponent = BloodSugarView;
    } else if (selectedTab === 3) {
      SubComponent = BmiView;
    }

    return (
      <div className={classes.root}>
        <div className={classes.tabs_container}>
          <Tabs
            className={classes.tabs}
            orientation="vertical"
            value={selectedTab}
            onChange={(_event, newValue) => {
              // const route = this.routes[newValue - 1];
              // this.props.history.push({ pathname: route });
              this.setState({ selectedTab: newValue });
            }}
          >
            <Tab
              className={classes.tabTitle}
              label="Medical Measurements"
              disabled
              wrapped
              {...a11yProps(0)}
            />
            <Tab
              className={classes.tab}
              label="Heart pressure"
              {...a11yProps(1)}
            />
            <Tab
              className={classes.tab}
              label="Sugar level"
              {...a11yProps(2)}
            />
            <Tab className={classes.tab} label="Bmi" {...a11yProps(3)} />
          </Tabs>
          <Button onClick={this.logout} variant="contained" color="primary">
            logout
          </Button>
        </div>
        <div className={classes.tabpanel}>
          <SubComponent />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(MeasurementsContainer);
