import { useQuery } from "@tanstack/react-query";
import { Dune, DuneQueryState } from "../services/Dune";
import { Box, Typography } from "@mui/material";
import { capitalize } from "./utils";
import { ChartProps } from "./Dashboard";
import dynamic from "next/dynamic";
import { useChartConfig } from "../hooks/useChartConfig";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

interface Props {
  index: number
  title?: string
}

export const DuneChart = ({ title, executionID, state }: Props & ChartProps) => {
  const { isLoading: isFetchingResults, data: results, error } = useQuery([executionID, state], () => {
    if (state === DuneQueryState.COMPLETED) {
      console.log("fetching results for", executionID)
      return Dune.fetchExecutionResults(executionID)
    }
    return null
  })
  const columnNames = results?.data?.result?.metadata?.column_names
  const rows = results?.data?.result?.rows
  const isLoading = isFetchingResults || state === DuneQueryState.PENDING || state === DuneQueryState.EXECUTING
  const { primaryAxis, secondaryAxes, data } = useChartConfig({
    rows,
    columnNames,
    dataType: "time",
    elementType: "line"
  })
  // console.log('chart rows', rows, results)

  return <Box sx={{
    borderRadius: "12px",
    height: 300,
    backgroundColor: "#fafafa",
  }}>
    <Box sx={{ paddingTop: "16px", paddingLeft: "24px", paddingRight: "24px" }}>
      {title && <Typography variant="h6">{capitalize(title)}</Typography>}
      {isLoading && <Typography variant="subtitle1" sx={{ mt: 1 }}>Loading...</Typography>}
      {error && <div>Error: {error?.message}</div>}
    </Box>
    {rows &&
      <Chart
        options={{
          data: [{
            label: capitalize(title),
            data
          }],
          primaryAxis,
          secondaryAxes,
          padding: {
            bottom: 48,
            top: 16,
            left: 24,
            right: 24
          },
          initialWidth: 500,
          initialHeight: 280,
          defaultColors: ["#E0694A"],
        }}
      />}
  </Box>
}

export default DuneChart