import React from 'react';



function SelectInput({ label, options  }) {
    return (
        <>
            <label htmlFor="industry-select" className="form-label text-default">
                {label}
            </label>
            <select id="industry-select" className="form-select" aria-label="Select industry">
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