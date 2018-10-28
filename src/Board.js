import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { sortBy, orderBy } from "lodash";

import "./styles.css";
import data from "./data.json";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

// Sorting the array by name key
const rows = sortBy(data, "name");
const totalMarks = {};
rows.map((row, key) => {
  totalMarks[key] = {
    rollNumber: row.rollNumber,
    marks:
      parseInt(row.marks.Maths) +
      parseInt(row.marks.Science) +
      parseInt(row.marks.English)
  };
});

// Creating a total marks array and sorting it in descending order
const topper = orderBy(totalMarks, "marks", ["desc"]);
const topperRollNumber = topper ? topper[0].rollNumber : null;

function Board(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} padding="dense">
        <TableHead className="THeader">
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Roll No.</TableCell>
            <TableCell numeric>Maths</TableCell>
            <TableCell numeric>English</TableCell>
            <TableCell numeric>Science</TableCell>
            <TableCell numeric>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" className="Name">
                  {row.name}
                </TableCell>
                <TableCell numeric>
                  {row.rollNumber ? row.rollNumber : "NA"}
                </TableCell>
                <TableCell numeric>
                  {row.marks.Maths ? row.marks.Maths : "NA"}
                </TableCell>
                <TableCell numeric>
                  {row.marks.Science ? row.marks.Science : "NA"}
                </TableCell>
                <TableCell numeric>
                  {row.marks.English ? row.marks.English : "NA"}
                </TableCell>
                <TableCell numeric>
                  {parseInt(row.marks.English) +
                    parseInt(row.marks.Science) +
                    parseInt(row.marks.Maths)}
                </TableCell>
                {row.rollNumber == topperRollNumber ? (
                  <TableCell className="topper">Topper</TableCell>
                ) : parseInt(row.marks.English) >= 20 &&
                parseInt(row.marks.Science) >= 20 &&
                parseInt(row.marks.Maths) >= 20 ? (
                  <TableCell>Passed</TableCell>
                ) : (
                  <TableCell className="Fail">Fail</TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

Board.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Board);
