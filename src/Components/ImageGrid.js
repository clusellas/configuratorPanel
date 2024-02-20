import React from 'react';
import './ImageGrid.css'; // Import CSS file for styles

const ImageGrid = ({ elements, onImageClick }) => {
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
                                src={element.img}
                                alt={element.name}
                                onClick={() => onImageClick(element)}
                                className="image"
                            />
                            <p>{element.name}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImageGrid