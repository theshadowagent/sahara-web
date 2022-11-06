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
  subtitle?: string
}

export const DuneChart = ({ title, subtitle, executionID, queryID, state }: Props & ChartProps) => {
  const { isLoading: isFetchingResults, data: results, error } = useQuery({
    queryKey: [executionID, state],
    queryFn: () => {
      if (state === DuneQueryState.COMPLETED) {
        console.log("fetching results for", executionID)
        return Dune.fetchExecutionResults(executionID)
      }
      return null
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
  console.log("re-rendering chart", executionID)

  const isChartCounter = rows ? rows?.length <= 1 : undefined

  return <Box sx={{
    borderRadius: "12px",
    height: isChartCounter ? "auto" : 320,
    paddingBottom: isChartCounter ? "16px" : "0px",
    backgroundColor: "#fafafa",
  }}>
    <Box sx={{ paddingTop: "16px", paddingLeft: "24px", paddingRight: "24px" }}>
      {title && <Typography variant="h6">{capitalize(title)}</Typography>}
      {subtitle && <Typography variant="subtitle2" sx={{ mt: 0 }}>Showing results for <a href={`https://dune.com/queries/${queryID}`} target="_blank"><span style={{ fontWeight: 600 }}>{subtitle}</span></a></Typography>}
      {isLoading && <Typography variant="subtitle1" sx={{ mt: 1 }}>Loading...</Typography>}
      {error && <div>Error: {error?.message}</div>}
    </Box>
    {isChartCounter &&
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mt: 1,
          ml: "24px"
        }}>
        {Object.values(rows[0])[0]}
      </Typography>
    }
    {isChartCounter === false &&
      <Chart
        options={{
          data: [{
            label: capitalize(title),
            data
          }],
          primaryAxis,
          secondaryAxes,
          padding: {
            bottom: 64,
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