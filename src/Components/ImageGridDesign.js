import React from 'react';
import './ImageGridDesign.css'; // Import CSS file for styles

const ImageGrid = ({ elements, onImageClick }) => {
    const rows = [];
    for (let i = 0; i < elements.length; i += 5) {
        rows.push(elements.slice(i, i + 5));
    }

    return (
        <div className="images-in-rows-of-three-design">
            {rows.map((row, index) => (
                <div key={index} className="image-row-design">
                    {row.map((element, rowIndex) => (
                        <div key={rowIndex} className="image-column-design" >
                            <img
                                src={element.design_coleccion.img}
                                alt={element.design_coleccion.design.code}
                                onClick={() => onImageClick(element)}
                                className="image-design"
                            />
                            <p>{element.design_coleccion.design.code}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImageGrid