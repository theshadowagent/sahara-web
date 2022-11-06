import { DataGrid } from '@mui/x-data-grid';

export const DuneChartTable = ({ columns, rows }) => {
  return (
    <DataGrid
      sx={{ mt: 3 }}
      rows={rows?.map((row, index) => ({ id: index, ...row }))}
      columns={columns?.map(c => ({ field: c, headerName: c, width: 150 }))}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  )
}

export default DuneChartTable