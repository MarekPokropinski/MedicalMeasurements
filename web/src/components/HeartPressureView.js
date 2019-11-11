import React, { useState } from "react";
import axios from "../client";
import { withStyles } from "@material-ui/core/styles";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  BottomNavigation,
  BottomNavigationAction,
  FormGroup,
  FormControl,
  InputAdornment,
  FormHelperText,
  Input,
  Button
} from "@material-ui/core";

import { AddCircleRounded } from "@material-ui/icons";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  bottomNavigation: {
    position: "absolute",
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
    overflow: "scroll"
  },
  addForm_formControl: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  addForm_addButton: {
    marginTop: "20px"
  }
});

function AddHeartPressureMeasurement(props) {
  const { onAdd, classes } = props;
  const [state, setState] = useState({ sys: "", dia: "", hr: "" });

  return (
    <div className={classes.addForm}>
      <FormGroup className={classes.addForm_formControl}>
        <FormControl>
          <Input
            value={state.sys}
            onChange={event => setState({ ...state, sys: event.target.value })}
            endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
          />
          <FormHelperText>Systolic</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            value={state.sys}
            onChange={event => setState({ ...state, sys: event.target.value })}
            endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
          />
          <FormHelperText>Diastolic</FormHelperText>
        </FormControl>
        <FormControl>
          <Input
            value={state.sys}
            onChange={event => setState({ ...state, sys: event.target.value })}
            endAdornment={<InputAdornment position="end">bpm</InputAdornment>}
          />
          <FormHelperText>Heart Rate</FormHelperText>
        </FormControl>
        <Button className={classes.addForm_addButton} variant="contained" color="primary">Add</Button>
      </FormGroup>
    </div>
  );
}

function HeartPressureTable(props) {
  const { data } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Sys</TableCell>
          <TableCell>Dia</TableCell>
          <TableCell>Hr</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.id}>
            <TableCell>{row.systolic_pressure}</TableCell>
            <TableCell>{row.diastolic_pressure}</TableCell>
            <TableCell>{row.heart_rate}</TableCell>
            <TableCell>
              {Intl.DateTimeFormat("en-GB").format(Date.parse(row.date))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

class HeartPressureView extends React.Component {
  state = { data: null, selectedItem: 0 };
  async fetchData() {
    const data = (await axios.get("api/heart-measurements")).data;
    this.setState({ data });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { data, selectedItem } = this.state;
    const { classes } = this.props;

    if (data === null) {
      return null;
    }

    let subComponent = null;
    if (selectedItem === 0) {
      subComponent = <AddHeartPressureMeasurement classes={classes} />;
    }
    if (selectedItem === 1) {
      subComponent = <HeartPressureTable data={data} />;
    }

    return (
      <div className={classes.root}>
        {subComponent}

        <BottomNavigation
          className={classes.bottomNavigation}
          value={selectedItem}
          onChange={(_event, newValue) => {
            this.setState({ selectedItem: newValue });
            console.log(newValue);
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
