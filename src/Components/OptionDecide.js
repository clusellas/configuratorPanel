import React from "react";
import {
    Grid,
    Button,
    Typography,
    CircularProgress,
    Autocomplete,
    TextField,
    styled,
} from "@mui/material";

const OptionBox = styled("div")(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#e6e6e6",
    marginTop: theme.spacing(1),
}));

const ScrollableImageList = styled(Grid)(({ theme }) => ({
    //maxHeight: 1000,
    overflowY: "auto",
    maxHeight: "70vh",
}));

const ImageContainer = styled("div")(({ theme, selected }) => ({
    border: `4px solid ${
        selected ? theme.palette.primary.main : "transparent"
    }`,
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    "&:hover": {
        borderColor: theme.palette.primary.light,
    },
    backgroundColor: selected ? "grey" : "white",
    textAlign: "center",
}));

const OptionDecide = ({
    element,
    onValueClick,
    opciones_y_valores,
    navigation,
}) => {
    const baseURL = "http://localhost:8000";

    if (!element) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
            </div>
        );
    }

    const allCodesAreNumbers = element.valores.every((item) =>
        /^-?\d+(,\d+)?$/.test(item.code)
    );

    return (
        <OptionBox //sx={{ mt: 2 }}
        >
            <Typography variant="h5">{element.name}</Typography>
            <div style={{ margin: "20px 0" }}>
                {allCodesAreNumbers ? (
                    <Autocomplete
                        options={element.valores}
                        getOptionLabel={(option) => option.code}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Value"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                        onChange={(event, value) =>
                            onValueClick(element, value)
                        }
                    />
                ) : (
                    <ScrollableImageList container spacing={2}>
                        {element.valores.map((item, index) => {
                            const selected = opciones_y_valores.some(
                                (val) =>
                                    val.opcion.id === element.id &&
                                    val.valor.id === item.id
                            );
                            return (
                                <Grid item xs={12} sm={6} key={index}>
                                    <ImageContainer
                                        selected={selected}
                                        onClick={() =>
                                            onValueClick(element, item)
                                        }
                                    >
                                        <img
                                            src={`${baseURL}${item.image}`}
                                            alt={item.code}
                                            style={{
                                                width: "95%",
                                                height: "auto",
                                            }}
                                        />
                                        <Typography variant="body2">
                                            {item.description}
                                        </Typography>
                                    </ImageContainer>
                                </Grid>
                            );
                        })}
                    </ScrollableImageList>
                )}
            </div>
            <div>
                <Button
                    onClick={() => navigation("back")}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                >
                    Back
                </Button>
                <Button
                    onClick={() => navigation("next")}
                    variant="contained"
                    color="primary"
                >
                    Next
                </Button>
            </div>
        </OptionBox>
    );
};

export default OptionDecide;
