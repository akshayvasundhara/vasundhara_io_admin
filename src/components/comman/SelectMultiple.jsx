import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectMultiple = ({ label, options, name, value, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(value || []);

    // Update the selected options when the value prop changes
    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    const handleChange = (selectedOptions) => {
        // Extract the values from the selected options
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedOptions(values);
        onChange(name, values); // Pass the name and selected values to the parent
    };

    return (
        <div>
            <label htmlFor="industry-select" className="form-label text-default">
                {label}
            </label>
            <Select
                isMulti
                options={options}
                name={name}
                value={options.filter(option => selectedOptions.includes(option.value))} // Map to display selected options correctly
                onChange={handleChange}
            />
        </div>
    );
};

export default SelectMultiple;
