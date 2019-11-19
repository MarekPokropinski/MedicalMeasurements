import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

import {
  FormGroup,
  InputAdornment,
  TextField,
  Button
} from "@material-ui/core";
import getRowColor from "./getRowColor";

const useStyles = makeStyles(theme => ({
  addForm: {
    width: "100%",
    height: "100%",
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
}));

export default function AddSugarMeasurement(props) {
  const { onAdd, getCategory } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    level: 0,
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
            label="Sugar level"
            value={state.level}
            onChange={event => {
              const newState = { ...state, level: event.target.value };
              setState(newState);
              checkCategory(newState);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">mg/dL</InputAdornment>
              )
            }}
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
