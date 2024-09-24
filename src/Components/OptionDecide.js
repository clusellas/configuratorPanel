import React from "react";
import {
    Grid,
    ImageList,
    ImageListItem,
    Button,
    Typography,
    CircularProgress,
    Autocomplete,
    TextField,
    styled,
} from "@mui/material";
import "./OptionDecide.css";

const OptionBox = styled("div")(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#e6e6e6",
    //borderRadius: theme.shape.borderRadius,
    //boxShadow: theme.shadows[3],
}));

const OptionDecideContainer = styled("div")(({ theme }) => ({
    margin: theme.spacing(2),
}));

const OptionDecideContent = styled("div")(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const ScrollableImageList = styled(ImageList)(({ theme }) => ({
    maxHeight: 1000, // Adjust this height as needed
    overflowY: "scroll",
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
}));

const OptionDecide = ({
    element,
    onValueClick,
    opciones_y_valores,
    navigation,
}) => {
    // ", onValueClick: " +onValueClick +
    const baseURL = "http://localhost:8000";

    const numColumns = 2; // Determine the number of columns based on the elements array

    let allCodesAreNumbers;

    if (element) {
        // Es para saber si mostarmos elelmentos o un simpe textfield con opciones
        allCodesAreNumbers = element.valores.every((item) =>
            /^-?\d+(,\d+)?$/.test(item.code)
        );
    }

    if (!element) {
        // Return a loading indicator if elements is null
        return (
            <div className="option-decide-loading">
                <CircularProgress />
            </div>
        );
    }

    return (
        <OptionBox sx={{ mt: 1 }}>
            <OptionDecideContainer>
                <Typography variant="h5" className="option-decide-title">
                    {element.name}
                </Typography>
                <OptionDecideContent
                    className={`option-decide-content ${
                        numColumns === 2 ? "two-columns" : "one-column"
                    }`}
                >
                    {allCodesAreNumbers ? (
                        <Autocomplete
                            options={element.valores}
                            getOptionLabel={(option) => option.code}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Value"
                                    variant="outlined"
                                />
                            )}
                            onChange={(event, value) =>
                                onValueClick(element, value)
                            }
                            fullWidth
                        />
                    ) : (
                        <Grid container spacing={2}>
                            <ScrollableImageList cols={numColumns}>
                                {element.valores.map((item, index) => {
                                    const selected = opciones_y_valores.some(
                                        (val) =>
                                            val.opcion.id === element.id &&
                                            val.valor.id === item.id
                                    );
                                    return (
                                        <ImageListItem
                                            key={index}
                                            onClick={() =>
                                                onValueClick(element, item)
                                            }
                                        >
                                            <ImageContainer
                                                selected={selected}
                                                style={{
                                                    backgroundColor: selected
                                                        ? "grey"
                                                        : "white",
                                                }}
                                            >
                                                <img
                                                    src={`${baseURL}${item.image}`}
                                                    alt={item.code}
                                                    style={{
                                                        width: "95%",
                                                        height: "auto",
                                                    }}
                                                />
                                                <Typography
                                                    className="image-text"
                                                    variant="body2"
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(255, 255, 255, 0,7)",
                                                        width: "97%",
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>
                                            </ImageContainer>
                                        </ImageListItem>
                                    );
                                })}
                            </ScrollableImageList>
                        </Grid>
                    )}
                </OptionDecideContent>
                <div className="option-decide-navigation">
                    <Button
                        onClick={() => navigation("back")}
                        variant="contained"
                        color="primary"
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
            </OptionDecideContainer>
        </OptionBox>
    );
};

export default OptionDecide;
