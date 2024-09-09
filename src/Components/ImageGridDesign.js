import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const ImageContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
}));

const ImageGrid = ({ elements, onImageClick }) => {
    const rows = [];
    for (let i = 0; i < elements.length; i += 5) {
        rows.push(elements.slice(i, i + 5));
    }

    return (
        <Grid container spacing={2}>
            {rows.map((row, rowIndex) => (
                <Grid container item spacing={2} key={rowIndex}>
                    {row.map((element, elementIndex) => (
                        <Grid item xs={12} sm={6} md={4} lg={2.4} key={elementIndex}>
                            <ImageContainer onClick={() => onImageClick(element.design_coleccion.design)}>
                                <img
                                    src={element.design_coleccion.image}
                                    alt={element.design_coleccion.design.code}
                                    style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'cover' }}
                                />
                                <Typography variant="body1">{element.design_coleccion.design.name }</Typography>
                            </ImageContainer>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGrid;
