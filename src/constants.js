import moment from 'moment'

export const DATE_FORMATS = [
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'MM-DD-YYYY',
    'DD-MM-YYYY',
    'YYYY/MM/DD',
    'DD.MM.YYYY',
    'MM.DD.YYYY',
    moment.ISO_8601
]

export const EMPLOYEES_TABLE_COLUMNS = [
    { field: 'emp1', headerName: 'Employee ID #1', width: 150 },
    { field: 'emp2', headerName: 'Employee ID #2', width: 150 },
    { field: 'projectId', headerName: 'Project ID', width: 150 },
    { field: 'days', headerName: 'Days worked', width: 150 }
]