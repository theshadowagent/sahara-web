import axios from "axios";

class Dune_ {

  _get = async (url: string) => {
    return axios.get(url, {
        headers: this.getHeaders()
      })
      .then((response) => {
        return { data: response.data }
      })
      .catch((error) => {
        console.error(error);
        return { error }
      })
  }

  _post = async (url: string) => {
    console.log("headers", this.getHeaders())
    return axios.post(url, {}, {
      headers: this.getHeaders()
    })
      .then((response) => {
        return { data: response.data }
      })
      .catch((error) => {
        console.error(error);
        return { error }
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

  checkExecutionStatus = async (executionID: number) => {
    const result = this._get(`https://api.dune.com/api/v1/execution/${executionID}/status`)
    console.log(result)
    return result
  }

  fetchExecutionResults = async (executionID?: string) => {
    if (!executionID) return
    const result = this._get(`https://api.dune.com/api/v1/execution/${executionID}/results`)
    console.log(result)
    return result
  }

}

export const Dune = new Dune_()