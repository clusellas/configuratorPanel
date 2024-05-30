import React from 'react';
import {
    Grid,
    ImageList,
    ImageListItem,
    Button,
    Typography,
    CircularProgress,
    Autocomplete,
    TextField,
    styled
} from '@mui/material';
import './OptionDecide.css'

const OptionDecide = ({ element, onValueClick, opciones_y_valores, navigation }) => {

    const baseURL = 'http://localhost:8000';

    const numColumns =  2; // Determine the number of columns based on the elements array

    let allCodesAreNumbers;

    if (element){
        allCodesAreNumbers = element.valores.every(item => /^-?\d+(,\d+)?$/.test(item.code));
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
        <div className="option-box">
            <div className="option-decide-container">
                <Typography variant="h5" className="option-decide-title">{element.name}</Typography>
                <div className={`option-decide-content ${numColumns === 2 ? 'two-columns' : 'one-column'}`}>

                    {allCodesAreNumbers ? (
                        <Autocomplete
                            options={element.valores}
                            getOptionLabel={(option) => option.code}
                            renderInput={(params) => <TextField {...params} label="Select Value" variant="outlined" />}
                            onChange={(event, value) => onValueClick(element, value)}
                            fullWidth
                        />
                    ) : (
                        <Grid container spacing={2}>
                            <ImageList cols={numColumns}>
                                {element.valores.map((item, index) => {
                                    const selected = opciones_y_valores.some(val => val.opcion.id === element.id && val.valor.id === item.id);
                                    return (
                                        <ImageListItem key={index} onClick={() => onValueClick(element, item)} >
                                            <img src={`${baseURL}${item.image}`} alt={item.code} />
                                            <Typography className="image-text" variant="body2"  style={{ backgroundColor: selected ? 'grey' : 'white' }}>{item.code}</Typography>
                                        </ImageListItem>

                                    );
                                })}
                            </ImageList>
                        </Grid>
                        )
                    }
                </div>
                <div className="option-decide-navigation">
                    <Button onClick={() => navigation('back')} variant="contained" color="primary">Back</Button>
                    <Button onClick={() => navigation('next')} variant="contained" color="primary">Next</Button>
                </div>
            </div>
        </div>


    );
};

export default OptionDecide;


