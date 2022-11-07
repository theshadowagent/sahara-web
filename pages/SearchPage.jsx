import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Dune, DuneQueryState } from "../services/Dune";
import { useState } from "react";
import Dashboard from "../components/Dashboard";
import { API } from "../services/API";
import AwaitingButton, { LoadingState } from "../components/AwaitingButton";
import IonIcon from "../components/icons";

let textQuery

const DISTANCE_THRESHOLD = 0.12
const DISTANCE_THRESHOLD_LOWER = 0.09

const shouldUseGenerate = (distance, textQuery) => {
  if (textQuery?.toLowerCase()?.includes("lens ")) {
      return distance > DISTANCE_THRESHOLD_LOWER
  }
  return distance > DISTANCE_THRESHOLD
}

const searchOrGenerate = async ({ useGenerate, setSearchRequestState }) => {
  if (!useGenerate) {
    return { executionID: null, state: DuneQueryState.COMPLETED }
  }

  const queryID = Dune.getDynamicQueryID(textQuery)
  console.log("Using dynamic query ID", queryID)

  const { data: generateResult, error: generateError } = await API.generateDuneSQL(textQuery)
  if (generateError) {
    console.error("error in API.generateDuneSQL", generateError)
    setSearchRequestState(LoadingState.ERROR)
    return { error: generateError }
  }
  console.log("GPT-3 generated SQL:", generateResult)
  const { sql } = generateResult
  const { data: executeResult, error } = await Dune.executeQuery(Number(queryID), sql)
  if (error) {
    console.error("error in Dune.executeQuery", error)
    setSearchRequestState(LoadingState.ERROR)
    return { error: generateError }
  }
  const { execution_id: executionID, state } = executeResult
  return { executionID, state, sql }
}

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
    const { query_id: queryID, name, visualization, distance } = results[0]
    console.log("visualization", visualization)
    console.log("results", results)

    const useGenerate = shouldUseGenerate(distance, textQuery)
    console.log("useGenerate", useGenerate)
    const { executionID, state, sql, error } = await searchOrGenerate({ useGenerate, setSearchRequestState })
    if (error) {
      return
    }

    const newChart = {
      key: chartKey,
      textQuery,
      queryID,
      executionID,
      state,
      duneTitle: name,
      type: visualization.type,
      isSQLGenerated: useGenerate,
      sql
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
          startAdornment:
            <IonIcon
              sx={{
                ml: 4,
                mr: 0,
                pr: 0,
                width: 18,
                height: 18,
                color: "rgba(0, 0, 0, 0.40)",
                strokeWidth: "1px"
              }}
              name="search" />,
          sx: {
            borderRadius: "30px",
            "input": {
              paddingTop: "16px",
              paddingBottom: "16px",
            }
          }
        }}
        placeholder="e.g. ETH daily price"
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