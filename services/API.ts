import axios from "axios";

class API_ {

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
    console.log("headers", this.getHeaders())
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

  getHeaders = () => ({})

  searchDuneQuery = (query: string) => {
    const url = `https://sahara-server.herokuapp.com/search/?query=${query}`
    return this._get(url)
  }

  generateDuneSQL = (query: string) => {
    return this._get(`https://sahara-server.herokuapp.com/generate/?query=${query}`)
  }

  parseResultsVisualization = (results: any) => {
    return {
      results: results.map((result: any) => {
        const { visualizations, ...rest } = result
        const parsed = JSON.parse(visualizations)
        const getPriority = (v) => {
          console.warn("getPriority", v)
          switch (v) {
            case "table":
              return 1
            case "chart":
              return 2
            default:
              return 2
          }
        }

        const sortedVisualizations = parsed.sort((a: any, b: any) => {
          return getPriority(b.type) - getPriority(a.type)
        })
        console.log("sortedVisualizations", sortedVisualizations)

        return { ...result, visualization: sortedVisualizations[0] }
      })
    }
  }
}


export const API = new API_()