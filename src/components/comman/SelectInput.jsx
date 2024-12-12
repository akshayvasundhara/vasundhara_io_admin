import React from 'react';

function SelectInput({ select, label, id, options, name, value, onChange, required = false }) {

    return (
        <>
            <label htmlFor={id} className="form-label text-default">
                {label}
                {required && <span className="star">*</span>}
            </label>
            <select
                id={id}
                className="form-select"
                aria-label={`Select ${label.toLowerCase()}`}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="" disabled selected>Select {select}</option>
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