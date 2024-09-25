import React from "react";
import "./ImageGrid.css"; // Import CSS file for styles

const ImageGridAcabado = ({ elements, onImageClick }) => {
    const rows = [];
    for (let i = 0; i < elements.length; i += 3) {
        rows.push(elements.slice(i, i + 3));
    }

    if (elements[0].acabado == null) {
        return;
    }

    return (
        <div className="images-in-rows-of-three">
            {rows.map((row, index) => (
                <div key={index} className="image-row">
                    {row.map((element, rowIndex) => (
                        <div key={rowIndex} className="image-column">
                            <img
                                src={element.acabado.image}
                                alt={element.acabado.code}
                                onClick={() => onImageClick(element.acabado)}
                                className="image"
                            />
                            <p>{element.acabado.code}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImageGridAcabado;
