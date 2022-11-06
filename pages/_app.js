import '../styles/globals.css'
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Script from "next/script";

const queryClient = new QueryClient()

function App({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.4/dist/ionicons/ionicons.esm.js"></Script>
      <Script noModule src="https://unpkg.com/ionicons@5.5.4/dist/ionicons/ionicons.js"></Script>
      <Component {...pageProps} />
    </QueryClientProvider>
  </ThemeProvider>
}

export default App
