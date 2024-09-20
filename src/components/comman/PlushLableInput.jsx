import React, { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';

function PlushLableInput({ label, className, placeholder, type, name }) {
    const [inputs, setInputs] = useState(['']); // Initialize with one empty input

    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const addInput = () => {
        setInputs([...inputs, '']); // Add a new empty input
    };

    const removeInput = (index) => {
        setInputs(inputs.filter((_, i) => i !== index)); // Remove input at index
    };

    return (
        <>
            <label htmlFor="signin-username" className="form-label text-default">
                {label}
            </label>
            {inputs.map((value, index) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-2">
                    <input
                        type={type}
                        className={className}
                        placeholder={placeholder}
                        name={`${name}[${index}]`} // Adjust the name to reflect the index
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={value}
                    />
                    <div
                        className="input-add d-inline-flex justify-content-center align-items-center"
                        onClick={addInput}
                    >
                        <PiPlusBold />
                    </div>
                    {inputs.length > 1 && (
                        <div
                            className="input-add d-inline-flex justify-content-center align-items-center bg-danger"
                            onClick={() => removeInput(index)}
                        >
                            <RiDeleteBinLine />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default PlushLableInput;
