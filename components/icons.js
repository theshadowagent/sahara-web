import { Box } from "@mui/material";

export const IonIcon = (props) => {
    return <Box
      component="span"
      sx={{
        ...props.sx,
        display: "inline-flex",
        alignItems: "center"
      }}>
        {/* @ts-ignore */}
        <ion-icon
            name={props.name}
            style={{
                "--ionicon-stroke-width": props.sx?.strokeWidth ?? "32px",
                height: props.sx?.height,
                width: props.sx?.width
            }}
            {...props} />
    </Box>
}

export default IonIcon