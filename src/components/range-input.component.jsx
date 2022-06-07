import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Slider from '@mui/material/Slider';


function formatValue(value) {
    return value ? `Distance less than ${value} KM` : `Slide to narrow the distance!`;
}

export default function RangeInput({ onValueChange, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const debounce = useDebouncedCallback((newValue) => {
        onValueChange(newValue);  
    }, 500);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        debounce(newValue);
    };

    return (
        <Slider size='medium' defaultValue={defaultValue} step={0.01}
            max={100} aria-label="Range" getAriaValueText={formatValue} valueLabelFormat={formatValue} valueLabelDisplay="on" value={value} onChange={handleChange} />
    );
}