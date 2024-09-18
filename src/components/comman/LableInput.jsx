import React from 'react'

function LableInput({ label, className, id, placeholder, type, name, onChange, value }) {
    return (
        <>
            <label
                htmlFor="signin-username"
                className="form-label text-default"
            >
                {label}
            </label>
            <input
                type={type}
                className={className}
                id={id}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
            />
        </>
    )
}

export default LableInput
