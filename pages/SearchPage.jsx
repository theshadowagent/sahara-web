import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Dune, DuneQueryState } from "../services/Dune";
import { useState } from "react";
import Dashboard from "../components/Dashboard";

export const SearchPage = () => {
  let textQuery = undefined
  const [charts, setCharts] = useState([])

  const onSubmit = async () => {
    if (!textQuery?.length)
      return

    const chartKey = textQuery.toLowerCase()
    const chartExists = charts.find(chart => chart.key === chartKey)
    if (chartExists?.state === DuneQueryState.PENDING || chartExists?.state === DuneQueryState.EXECUTING) {
      console.warn("Chart execution pending, returning")
      return
    }

    const queryID = 661161
    const { data: executeResult, error } = await Dune.executeQuery(queryID)
    if (error) {
      console.error("error in Dune.executeQuery", error)
      return
    }
    const { execution_id: executionID, state } = executeResult

    const newChart = {
      key: chartKey,
      textQuery,
      queryID,
      executionID,
      state
    }
    const newCharts = chartExists
      ? charts.map(chart => chart.key === newChart.key ? newChart : chart)
      : [newChart, ...charts]

    setCharts(newCharts)
  }

  return <Container maxWidth="sm">
    {!charts?.length && <Box height="40vh"></Box>}
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}>
      <Typography variant="h3">
        Ask Ethereum 🧞
      </Typography>
      <TextField
        sx={{ mt: 3, width: "100%" }}
        variant="filled"
        label={undefined}
        onChange={e => {
          textQuery = e.target.value
        }}
        InputProps={{
          sx: {
            borderRadius: "30px",
            "input": {
              paddingTop: "16px",
              paddingBottom: "16px",
            }
          }
        }}
        placeholder="e.g. 1inch daily volume"
      />
      <Button
        sx={{ mt: 3, width: "min-content" }}
        variant="contained"
        onClick={onSubmit}>
        Search
      </Button>
    </Box>
    <Dashboard charts={charts} setCharts={setCharts} sx={{ mt: 3 }} />
  </Container>
}

export default SearchPage