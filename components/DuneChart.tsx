import { DuneQueryState } from "../services/Dune";
import { Box, Typography } from "@mui/material";
import { capitalize } from "./utils";
import { ChartProps } from "./Dashboard";
import DuneChartTable from "./DuneChartTable";
import { DuneChartLine } from "./DuneChartLine";
import { useFetchChartRows } from "../hooks/useFetchChartRows";
import CodeBlock from "./CodeBlock";

interface Props {
  index: number
  title?: string
  subtitle?: string
}

export const DuneChart = ({ type, title, subtitle, executionID, queryID, state, index, isSQLGenerated, sql }: Props & ChartProps) => {
  const { results, error, isFetchingResults } = useFetchChartRows({ state, queryID, executionID })
  const { columnNames, rows } = results ?? {}

  const isLoading = isFetchingResults || state === DuneQueryState.PENDING || state === DuneQueryState.EXECUTING
  const isError = state === DuneQueryState.FAILED || error
  console.log('isError', error, isError)
  console.log("re-rendering chart", executionID)

  const isChartCounter = rows ? rows?.length <= 1 : undefined

  console.log("chart type", type)
  const renderDuneChart = () => {
    switch (type) {
      case "table":
        return <DuneChartTable columns={columnNames} rows={rows} />
      default:
        return <DuneChartLine columns={columnNames} rows={rows} title={title} />
    }
  }

  const isHeightAuto = isChartCounter && index === 0

  return <Box sx={{
    borderRadius: "12px",
    minHeight: isChartCounter ? "auto" : 320,
    height: isHeightAuto ? "auto" : (type === "table" ? 392 : 320),
    paddingBottom: isChartCounter ? "16px" : "0px",
    backgroundColor: "#fafafa",
  }}>
    <Box sx={{ paddingTop: "16px", paddingLeft: "24px", paddingRight: "24px" }}>
      {title && <Typography variant="h6">{capitalize(title)}</Typography>}
      {(subtitle && !isSQLGenerated) && <Typography variant="subtitle2" sx={{ mt: 0 }}>Showing results for <a href={`https://dune.com/queries/${queryID}`} target="_blank"><span style={{ fontWeight: 600 }}>{subtitle}</span></a></Typography>}
      {isSQLGenerated && <Typography variant="subtitle2" sx={{ mt: 0 }}>✨ AI-generated query</Typography>}
      {isLoading && <Typography variant="subtitle1" sx={{ mt: 1 }}>Loading...</Typography>}
      {(error && !isSQLGenerated) && <Typography variant="subtitle1" sx={{ mt: 1 }}>Error: {error?.message}</Typography>}
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
    {isError && isSQLGenerated &&
      <Box sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
        <CodeBlock
          code={sql}
          language="sql" />
        <Typography
          variant="subtitle2"
          // yellow warning color
          sx={{ mt: 1, color: "#f5a623" }}>
          Generated SQL query failed. Fix your SQL on Dune Analytics
        </Typography>
      </Box>
    }
  </Box>
}

export default DuneChart