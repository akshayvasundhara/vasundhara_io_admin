import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const SelectMultiple = ({ label }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (options) => {
        setSelectedOptions(options);
        console.log('Selected options:', options);
    };

    return (
        <div>
            <label htmlFor="industry-select" className="form-label text-default">
                {label}
            </label>
            <Select
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                options={options}
            />
        </div>
    );
};

export default SelectMultiple;
