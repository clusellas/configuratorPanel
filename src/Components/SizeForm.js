import React, { useState } from 'react';
import './ImageGridDesign.css'; // Import CSS file for styles

const SizeFrom = ({ sizes , onSubmit }) => {
    const [value, setValue] = useState(''); // State to manage input value
    const [min, setmin] = useState(1000); // State to manage input value
    const [max, setmax] = useState(0); // State to manage input value


    for(let i = 0; i<sizes.length; i++){
        let value = parseInt(sizes[i].ancho.code,10);
        if (value>max){
            setmax(value);
        }else if(value<min){
            setmin(value);
        }
    }
    console.log(max)
    console.log(min)


    const handleChange = (event) => {
        setValue(event.target.value); // Update input value as it changes
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onSubmit(value); // Call the onSubmit function passed from the parent with the input value
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Ancho:
                <input type="number" value={value} min={min} max={max} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default SizeFrom;