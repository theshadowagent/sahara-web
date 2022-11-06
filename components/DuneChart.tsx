import { useQuery } from "@tanstack/react-query";
import { Dune, DuneQueryState } from "../services/Dune";
import { Box, Typography } from "@mui/material";
import { capitalize } from "./utils";
import { ChartProps } from "./Dashboard";
import DuneChartTable from "./DuneChartTable";
import { DuneChartLine } from "./DuneChartLine";

interface Props {
  index: number
  title?: string
  subtitle?: string
}

export const DuneChart = ({ type, title, subtitle, executionID, queryID, state }: Props & ChartProps) => {
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
  console.log("re-rendering chart", executionID)

  const isChartCounter = rows ? rows?.length <= 1 : undefined

  const renderDuneChart = () => {
    switch (type) {
      case "table":
        return <DuneChartTable columns={columnNames} rows={rows} />
      default:
        return <DuneChartLine columns={columnNames} rows={rows} title={title} />
    }
  }

  return <Box sx={{
    borderRadius: "12px",
    minHeight: isChartCounter ? "auto" : 320,
    height: type === "table" ? 392 : 320,
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
    {isChartCounter === false && renderDuneChart()}
  </Box>
}

export default DuneChart