import axios from "axios";

class Dune_ {

    getHeaders = () => ({
        "X-Dune-Api-Key": process.env.DUNE_API_KEY
    })

    executeQuery = (queryID: number) => {
        const url = `https://api.dune.com/api/v1/query/${queryID}/execute`
        const result = axios.get(url, {
            headers: this.getHeaders()
        })
        console.log(result)
        return result
    }

    checkExecutionStatus = (executionID: number) => {
        const result = axios.get(`https://api.dune.com/api/v1/execution/${executionID}/status`, {
            headers: this.getHeaders()
        })
        console.log(result)
        return result
    }

    fetchExecutionResults = (executionID: number) => {
        const result = axios.get(`https://api.dune.com/api/v1/execution/${executionID}/results`, {
            headers: this.getHeaders()
        })
        console.log(result)
        return result
    }

}

export const Dune = new Dune_()