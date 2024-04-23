import React, { useState } from 'react';
import './ImageGridDesign.css'; // Import CSS file for styles

const SizeFrom = ({ elements , onImageClick }) => {
    const [value, setValue] = useState(''); // State to manage input value
    const [min, setmin] = useState(1000); // State to manage input value
    const [max, setmax] = useState(0); // State to manage input value

    for(let i = 0; i<elements.length; i++){
        let value = parseInt(elements[i].ancho.code,10);
        if (value>max){
            setmax(value);
        }else if(value<min){
            setmin(value);
        }
    }


    const handleChange = (event) => {
        setValue(event.target.value); // Update input value as it changes
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log(value)
        onImageClick({'id':value}); // Call the onSubmit function passed from the parent with the input value
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Ancho:
                <select value={value} onChange={handleChange}>
                    {/* Generate dropdown options based on the list of elements */}
                    {elements.map((element, index) => (
                        <option key={index} value={element.ancho.id}>
                            {element.ancho.code}
                        </option>
                    ))}
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default SizeFrom;