import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const SearchPage = () => {
  return <Container maxWidth="sm">
    <Box
      sx={{
        textAlign: "center",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}>
      <Typography variant="h3">
        Search Ethereum
      </Typography>
      <TextField
        sx={{ mt: 3, width: "100%" }}
        variant="filled"
        label={undefined}
        InputProps={{
          sx: {
            borderRadius: "30px",
            "input": {
              paddingTop: "16px",
              paddingBottom: "16px",
            }
          }
        }}
        placeholder="e.g. 1inch daily volume"
      />
      <Button
        sx={{ mt: 3, width: "min-content" }}
        variant="contained">
        Search
      </Button>
    </Box>
  </Container>
}

export default SearchPage