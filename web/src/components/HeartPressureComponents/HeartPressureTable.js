import React from "react";
import { makeStyles } from "@material-ui/core";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper
} from "@material-ui/core";

import getRowColor from "./getRowColor";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    position: "relative",
    margin: 0,
    padding: "30px",
    boxSizing: "border-box"
  },
  table: {}
}));

export default function HeartPressureTable(props) {
  const { data } = props;
  const classes = useStyles();
  if (data === null) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sys</TableCell>
            <TableCell>Dia</TableCell>
            <TableCell>Hr</TableCell>
            <TableCell>category</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow
              key={row.id}
              style={{ backgroundColor: getRowColor(row.category) }}
            >
              <TableCell>{row.systolic_pressure}</TableCell>
              <TableCell>{row.diastolic_pressure}</TableCell>
              <TableCell>{row.heart_rate}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                {Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                }).format(Date.parse(row.date))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
