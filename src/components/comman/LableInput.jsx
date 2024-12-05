import React from 'react'

function LableInput({ label, className, id, placeholder, type, name, onChange, value, onkeyPress, required = false }) {
    return (
        <>
            <label
                htmlFor="signin-username"
                className="form-label text-default"
                id={id}
            >
                {label}
                {required && <span className="star">*</span>}
            </label>
            <input
                type={type}
                className={className}
                id={id}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
                onKeyPress={onkeyPress}
            />
        </>
    )
}

export default LableInput