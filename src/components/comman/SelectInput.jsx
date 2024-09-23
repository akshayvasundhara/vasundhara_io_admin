import React from 'react';



function SelectInput({ label, options, name, value, onChange }) {

    return (
        <>
            <label htmlFor="industry-select" className="form-label text-default">
                {label}
            </label>
            <select id="industry-select" className="form-select" aria-label={`Select ${label.toLowerCase()}`} name={name} value={value} onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
}

export default SelectInput;