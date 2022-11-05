import { Box, Grid } from "@mui/material";
import DuneChart from "./DuneChart";

export interface ChartProps {
  textQuery?: string
  executionID?: string
  queryID?: string
}

interface Props {
  charts?: ChartProps[]
  sx?: any
}

export const Dashboard = ({ charts, sx }: Props) => {
  return <Grid container spacing={3} sx={{ width: "100%", display: "flex", flexWrap: "wrap", ...sx }}>
    {charts?.map(({ executionID }) => (
      <Grid item xs={6}>
        <DuneChart executionID={executionID} />
      </Grid>
    ))}
  </Grid>
}

export default Dashboard