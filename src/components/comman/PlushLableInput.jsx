import React, { useEffect, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';

function PlushLableInput({ label, className, placeholder, type, name, onChange, value }) {
    // const [inputs, setInputs] = useState(['']); // Initialize with one empty input
    const [inputs, setInputs] = useState(value || ['']);


    useEffect(() => {
        setInputs(value); // Update local state when values prop changes
    }, [value]);
    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        onChange(newInputs);
    };

    const addInput = () => {
        const newInputs = [...inputs, ''];
        setInputs(newInputs);
        onChange(newInputs);
    };

    const removeInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index); // Remove input at index
        setInputs(newInputs);
        onChange(newInputs); // Notify parent of changes
    };

    return (
        <>
            <div className='d-flex justify-content-between align-items-center gap-3 mb-2'>
                <label htmlFor="signin-username" className="form-label text-default">
                    {label}
                </label>
                <div
                    className="input-add d-inline-flex justify-content-center align-items-center"
                    onClick={addInput}
                >
                    <PiPlusBold />
                </div>
            </div>
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

                    {inputs && (
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
