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

  _post = async (url: string) => {
    return axios.post(url, {}, {
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
}


export enum DuneQueryState {
  PENDING = "QUERY_STATE_PENDING",
  EXECUTING = "QUERY_STATE_EXECUTING",
  COMPLETED = "QUERY_STATE_COMPLETED"
}


export const Dune = new Dune_()