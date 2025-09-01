import './App.css';
import { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { EMPLOYEES_TABLE_COLUMNS } from './constants';
import { getEmployeeOverlapRows } from './utils';

function EmployeesTable({ data }) {
  const rows = useMemo(() => getEmployeeOverlapRows(data), [data]);

  return (
    <div className="data-grid-wrapper-container">
      <div className="data-grid-wrapper">
      <DataGrid
          className="data-grid"
          rows={rows}
          columns={EMPLOYEES_TABLE_COLUMNS}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}

export default EmployeesTable;