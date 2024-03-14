import React from 'react';
import './ImageGrid.css';
import { Box, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from "@mui/material";

const ImageGridMIU = ({ elements, onImageClick }) => {
    return (
        <div className="image-grid-container">
            <Box sx={{ width: "100%", height: "100%", overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {elements.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                srcSet={`${item.img}?w=248&fit=cover&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=cover&auto=format`}
                                alt={item.name}
                                onClick={() => onImageClick(item)}
                                loading="lazy"
                                style={{objectFit:'cover'}}
                            />
                            <ImageListItemBar
                                title={item.name}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </div>
    );
};

export default ImageGridMIU;