import axios from "axios";

class Dune_ {

  _get = async (url: string) => {
    return axios.get(url, {
        headers: this.getHeaders()
      }).then((response) => {
        return { data: response.data, error: null }
      })
      .catch((error) => {
        console.error(error);
        return { data: null, error }
      })
  }

  _post = async (url: string, body: any = {}) => {
    return axios.post(url, body, {
      headers: this.getHeaders()
    })
      .then((response) => {
        return { data: response.data, error: null }
      })
      .catch((error) => {
        console.error(error);
        return { data: null, error }
      })
  }

  getHeaders = () => ({
    "X-Dune-Api-Key": process.env.NEXT_PUBLIC_DUNE_API_KEY
  })

  executeQuery = async (queryID: number) => {
    const url = `https://api.dune.com/api/v1/query/${queryID}/execute`
    const result = await this._post(url)
    console.log('executeQuery', result)
    return result
  }

  fetchExecutionStatus = async (executionID?: string) => {
    if (!executionID) return
    return this._get(`https://api.dune.com/api/v1/execution/${executionID}/status`)
  }

  fetchExecutionResults = async (executionID?: string) => {
    if (!executionID) return
    return await this._get(`https://api.dune.com/api/v1/execution/${executionID}/results`)
  }

  fetchCachedResultID = async (queryID?: number) => {
    if (!queryID) return
    return await this._post("https://sahara-server.herokuapp.com/proxy/", {
      "operationName": "GetResult",
      "variables": {
        "query_id": queryID,
        "parameters": []
      },
      "query": "query GetResult($query_id: Int!, $parameters: [Parameter!]!) {\n  get_result_v3(query_id: $query_id, parameters: $parameters) {\n    job_id\n    result_id\n    error_id\n    __typename\n  }\n}\n"
    })
      .then(r => {
        return r
      })
      .then(r => ({ data: r?.data?.data?.get_result_v3?.result_id, error: null }))
      .catch(e => ({ data: null, error: e.message }))
  }

  fetchCachedExecutionResults = async (queryID?: number) => {
    const { data: resultID, error: resultError } = await this.fetchCachedResultID(queryID)
    if (resultError) {
      return { data: null, error: resultError }
    }
    return await this._post("https://sahara-server.herokuapp.com/proxy/", {
      "operationName": "FindResultDataByResult",
      "variables": {
        "result_id": resultID,
        "error_id":"00000000-0000-0000-0000-000000000000"
      },
      "query": "query FindResultDataByResult($result_id: uuid!, $error_id: uuid!) {\n  query_results(where: {id: {_eq: $result_id}}) {\n    id\n    job_id\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  query_errors(where: {id: {_eq: $error_id}}) {\n    id\n    job_id\n    runtime\n    message\n    metadata\n    type\n    generated_at\n    __typename\n  }\n  get_result_by_result_id(args: {want_result_id: $result_id}) {\n    data\n    __typename\n  }\n}\n"
    }).then(r => {
      console.log("fetchCachedExecutionResults", r)
      return r
    })
      .then(r => ({ data: {
          results: r?.data?.data?.get_result_by_result_id,
          columns: r?.data?.data?.query_results[0]?.columns,
        }, error: null }))
      .catch(e => ({ data: null, error: e.message }))
  }
}


export enum DuneQueryState {
  PENDING = "QUERY_STATE_PENDING",
  EXECUTING = "QUERY_STATE_EXECUTING",
  COMPLETED = "QUERY_STATE_COMPLETED"
}


export const Dune = new Dune_()