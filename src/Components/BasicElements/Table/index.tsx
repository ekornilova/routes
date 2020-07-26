import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableProps, AnyObject } from './interfaces';

const StPaper = styled(Paper)`
  width: 100%;
`;
const StTableContainer = styled(TableContainer)`
  max-height: 310px;
`;
const StTableBody = styled(TableBody)`
  overflow-y: scroll;
`;

const StTable = <T extends AnyObject>({ columns, rows, className }: TableProps<T>) => {
  return (
    <StPaper className={className}>
      <StTableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <StTableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </StTableBody>
        </Table>
      </StTableContainer>
    </StPaper>
  );
};
export default StTable;
