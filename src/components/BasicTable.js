import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 600
  }
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth:650
  },
  tableContainer: {
    marginTop:20,
    marginBottom:20
  }
});

export default function BasicTable(props) {
  const classes = useStyles();

  const data = props.data;
  const projects = data?.projects;

  return (
    <TableContainer className={classes.tableContainer} component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Project ID</StyledTableCell >
            <StyledTableCell  align="right">Days Worked</StyledTableCell >
            <StyledTableCell  align="right">Emplyee1 ID</StyledTableCell >
            <StyledTableCell  align="right">Employee2 ID</StyledTableCell >
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.project_id}>
              <TableCell component="th" scope="row">{project.project_id}</TableCell>
              <TableCell align="right">{project.daysWorked}</TableCell>
              <TableCell align="right">{data.employee1_id}</TableCell>
              <TableCell align="right">{data.employee2_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}