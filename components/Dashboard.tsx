import { Grid } from "@mui/material";
import DuneChart from "./DuneChart";
import useInterval from "@use-it/interval";
import { Dune, DuneQueryState } from "../services/Dune";

export interface ChartProps {
  key: string
  textQuery?: string
  executionID?: string
  queryID?: string
  state: DuneQueryState
}

export const Dashboard = ({ charts, setCharts, sx }) => {
  const pendingCharts = charts?.filter(chart => chart.state === DuneQueryState.PENDING || chart.state === DuneQueryState.EXECUTING)

  const refreshChartsStates = async () => {
    const refreshedCharts = await Promise.all(pendingCharts.map(c => Dune.fetchExecutionStatus(c.executionID)))
    if (!refreshedCharts.filter(({ data }) => data !== null)?.length)
      return

    console.log('refreshing charts', refreshedCharts)

    setCharts(charts.map(c => {
      const refreshedChart = refreshedCharts.find(({ data }) => data.execution_id === c.executionID)
      return {
        ...c,
        state: refreshedChart?.data?.state ?? c.state,
      }
    }))
  }

  useInterval(() => {
    refreshChartsStates()
  }, pendingCharts?.length ? 2000 : null)

  return <Grid container gap={3} sx={{ width: "100%", display: "flex", flexWrap: "wrap", ...sx }}>
    {charts?.map(({ key, textQuery, executionID, state }, index) => (
      <Grid key={key} item xs={index === 0 ? 12 : 6}>
        <DuneChart key={key} title={textQuery} executionID={executionID} state={state} />
      </Grid>
    ))}
  </Grid>
}

export default Dashboard