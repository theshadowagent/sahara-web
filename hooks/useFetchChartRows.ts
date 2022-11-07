import { useQuery } from "@tanstack/react-query";
import { Dune, DuneQueryState } from "../services/Dune";

export const useFetchChartRows = ({ queryID, executionID, state }) => {
  const { isLoading: isFetchingCachedResults, data: cachedResults, error: cachedError } = useQuery({
    queryKey: [queryID, executionID],
    queryFn: () => {
      if (executionID === null) {
        return Dune.fetchCachedExecutionResults(queryID)
          .then(({ data, error }) => {
            if (error) {
              throw new Error(error)
            }
            if (!data) {
              throw new Error("Error in fetchCachedExecutionResults: empty data")
            }
            return {
              rows: data?.results?.map(r => r?.data),
              columnNames: data?.columns
            }
        })
      }
      return null
    },
  })

  console.log('cached execution results', cachedResults, cachedError)

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
  console.log('executionID, error', executionID, executionID === null ? cachedError : executionError)

  return {
    isFetchingResults: isFetchingCachedResults ?? isFetchingExecutionResults,
    results: executionID === null ? cachedResults : executionResults,
    error: executionID === null ? cachedError as Error : executionError as Error
  }
}