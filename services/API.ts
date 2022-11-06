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
}


export const API = new API_()