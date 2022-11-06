import { allowCors } from "./_cors";
import axios from "axios";

export const handler = async (request, response) => {
  const body = request.body;
  const HEADERS = {
    "content-type": "application/json",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    "x-hasura-api-key": "",
  }

  try {
    const { data } = await axios.post("https://core-hsr.dune.com/v1/graphql", body, {
      headers: HEADERS
    })


    if (!data)
      return response.status(404).json({
        error: `No data returned`
      })

    return response.status(200).json(
      data
    );
  } catch (e) {
    return response.status(500).json({
      error: `Error: ${e.message}`
    })
  }
}

export default allowCors(handler);