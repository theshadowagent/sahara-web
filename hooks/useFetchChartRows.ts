import { useQuery } from "@tanstack/react-query";
import { Dune, DuneQueryState } from "../services/Dune";

export const useFetchChartRows = ({ queryID, executionID, state }) => {
  const { isLoading: isFetchingCachedResults, data: cachedResults, error: cachedError } = useQuery({
    queryKey: [queryID, executionID],
    queryFn: () => {
      if (executionID === null) {
        return Dune.fetchCachedExecutionResults(queryID)
          .then(r => ({
            rows: r?.data?.results?.map(r => r.data),
            columnNames: r?.data?.columns
          }))
      }
      return null
    },
  })

  console.log('cached execution results', cachedResults)

  const { isLoading: isFetchingExecutionResults, data: executionResults, error: executionError } = useQuery({
    queryKey: [executionID, state],
    queryFn: () => {
      if (executionID !== null && state === DuneQueryState.COMPLETED) {
        console.log("fetching results for", executionID)
        return Dune.fetchExecutionResults(executionID).then((results) => ({
          columnNames: results?.data?.result?.metadata?.column_names,
          rows: results?.data?.result?.rows
        }))
      }
      return null
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  console.log('execution results', executionResults, executionError)

  return {
    isFetchingResults: isFetchingCachedResults ?? isFetchingExecutionResults,
    results: executionResults ?? cachedResults,
    error: executionError ?? cachedError
  }
}