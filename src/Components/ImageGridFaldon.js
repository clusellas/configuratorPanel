import React from 'react';
import './ImageGrid.css'; // Import CSS file for styles

const ImageGridFaldon = ({ elements, onImageClick }) => {
    const rows = [];
    for (let i = 0; i < elements.length; i += 3) {
        rows.push(elements.slice(i, i + 3));
    }

    return (
        <div className="images-in-rows-of-three">
            {rows.map((row, index) => (
                <div key={index} className="image-row">
                    {row.map((element, rowIndex) => (
                        <div key={rowIndex} className="image-column">
                            <img
                                src={element.faldon.image}
                                alt={element.faldon.code}
                                onClick={() => onImageClick(element.faldon)}
                                className="image"
                            />
                            <p>{element.code}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImageGridFaldon