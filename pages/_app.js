import '../styles/globals.css'
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </ThemeProvider>
}

export default App
