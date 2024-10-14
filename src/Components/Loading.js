import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

function Loading() {
    return (
        <Grid
            container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                width: "100%",
            }}
        >
            <CircularProgress />
        </Grid>
    );
}

export default Loading;
