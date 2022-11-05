import { useQuery } from "@tanstack/react-query";
import { Dune } from "../services/Dune";
import { Box } from "@mui/material";

interface Props {
    executionID?: string
}

export const DuneChart = ({ executionID }: Props) => {
    const { isLoading, data: results, error } = useQuery([executionID], () => Dune.fetchExecutionResults(executionID))
    console.log('data', results)

    return <Box sx={{
        padding: "16px 24px",
        borderRadius: "12px",
        height: 250,
        backgroundColor: "#fafafa",
    }}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error?.message}</div>}
        {/*{results && <Chart data={results} />}*/}
    </Box>
}

export default DuneChart