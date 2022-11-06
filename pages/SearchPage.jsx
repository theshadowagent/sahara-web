import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Dune, DuneQueryState } from "../services/Dune";
import { useState } from "react";
import Dashboard from "../components/Dashboard";
import { API } from "../services/API";
import AwaitingButton, { LoadingState } from "../components/AwaitingButton";

let textQuery

export const SearchPage = () => {
  const [textQueryCache, setTextQueryCache] = useState(undefined)
  if (textQueryCache && !textQuery) {
    textQuery = textQueryCache
  }
  const [searchRequestState, setSearchRequestState] = useState(LoadingState.NOT_STARTED)
  const [charts, setCharts] = useState([])

  const onSubmit = async () => {
    if (!textQuery?.length) {
      console.warn("Empty text query, return")
      setSearchRequestState(LoadingState.NOT_STARTED)
      return
    }

    setTextQueryCache(textQuery)
    const chartKey = textQuery.toLowerCase()
    const chartExists = charts.find(chart => chart.key === chartKey)
    if (chartExists?.state === DuneQueryState.PENDING || chartExists?.state === DuneQueryState.EXECUTING) {
      console.warn("Chart execution pending, returning")
      setSearchRequestState(LoadingState.NOT_STARTED)
      return
    }

    const { data: searchResults, error: searchError } = await API.searchDuneQuery(textQuery)
    console.log("searchResults", searchResults)
    if (!searchResults || searchError) {
      console.error("Error searching query", searchError)
      setSearchRequestState(LoadingState.ERROR)
      return
    }
    const { results } = API.parseResultsVisualization(searchResults.results)
    const { query_id: queryID, name, visualization } = results[0]
    console.log("visualization", visualization)
    console.log("results", results)

    // const queryID = 661161
    const { data: executeResult, error } = await Dune.executeQuery(Number(queryID))
    if (error) {
      console.error("error in Dune.executeQuery", error)
      setSearchRequestState(LoadingState.ERROR)
      return
    }
    const { execution_id: executionID, state } = executeResult

    // TODO: don't hardcode this
    const isQueryResultCached = true

    const newChart = {
      key: chartKey,
      textQuery,
      queryID,
      executionID,
      state: isQueryResultCached ? DuneQueryState.COMPLETED : state,
      duneTitle: name,
      type: visualization.type
    }
    const newCharts = chartExists
      ? charts.map(chart => chart.key === newChart.key ? newChart : chart)
      : [newChart, ...charts]

    setCharts(newCharts)
    setSearchRequestState(LoadingState.SUCCESS)
  }

  return <Container sx={{ maxWidth: "700px !important", paddingTop: "40px", paddingBottom: "40px" }} >
    {!charts?.length && <Box height="30vh"></Box>}
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
      <AwaitingButton
        loadingState={searchRequestState}
        setLoadingState={setSearchRequestState}
        loadingText="Granting wish..."
        sx={{ mt: 3 }}
        variant="contained"
        onClick={onSubmit}>
        💫 Grant wish
      </AwaitingButton>
    </Box>
    <Dashboard charts={charts} setCharts={setCharts} sx={{ mt: 3 }} />
  </Container>
}

export default SearchPage