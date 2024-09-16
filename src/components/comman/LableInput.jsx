import React from 'react'

function LableInput({ label, className, id, placeholder, type }) {
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
            />
        </>
    )
}

export default LableInput
