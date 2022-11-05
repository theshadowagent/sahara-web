import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Dune } from "../services/Dune";
import { useState } from "react";
import Dashboard from "../components/Dashboard";

export const SearchPage = () => {
  const [textQuery, setTextQuery] = useState()
  const [charts, setCharts] = useState([])

  const onSubmit = async () => {
    if (!textQuery?.length)
      return

    const queryID = 661161
    const { data: duneQuery, error } = await Dune.executeQuery(queryID)
    if (error) {
      console.error("error in Dune.executeQuery", error)
      return
    }

    setCharts([{
        textQuery,
        queryID,
        executionID: duneQuery.execution_id,
      }, ...charts])
  }

  return <Container maxWidth="sm">
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}>
      <Typography variant="h3">
        Search Ethereum
      </Typography>
      <TextField
        sx={{ mt: 3, width: "100%" }}
        variant="filled"
        label={undefined}
        onChange={e => setTextQuery(e.target.value)}
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
    <Dashboard charts={charts} sx={{ mt: 2 }} />
  </Container>
}

export default SearchPage