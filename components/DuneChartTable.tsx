import { DataGrid } from '@mui/x-data-grid';

export const DuneChartTable = ({ columns, rows }) => {
  return (
    <DataGrid
      sx={{ mt: 3, height: "318px" }}
      rows={rows?.map((row, index) => ({ id: index, ...row }))}
      columns={columns?.map(c => ({ field: c, headerName: c }))}
      pageSize={4}
    />
  )
}

export default DuneChartTable