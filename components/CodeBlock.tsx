import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Box, Button } from "@mui/material";
import IonIcon from "./icons";

export const CodeBlock = ({ code, language, sx = {}, showCopy = true }) => {
  return (
    <Box sx={{
      ...sx,
      position: "relative",
      '& pre': {
        borderRadius: "8px !important",
        fontSize: "14px"
      }
    }}>
      {showCopy && <Button
        color="secondary"
        onClick={() => {
          navigator.clipboard.writeText(code)
        }}
        sx={{
          fontSize: "14px",
          backgroundColor: "#D3D3D4",
          color: "rgba(0, 0, 0, 0.54)",
          position: "absolute",
          right: 12,
          top: 12,
        }}>
        <IonIcon sx={{ mr: 1, strokeWidth: "48px" }} icon="copy-outline" /> Copy
      </Button>}
      <SyntaxHighlighter
        className="syntax-highlighter"
        language={language ?? "javascript"}
        style={oneLight}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  )
};

export default CodeBlock