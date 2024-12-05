import React from 'react'

function Textarea({ label, id, rows, type, name, value, onChange, placeholder, required = false }) {
    return (
        <>
            <label htmlFor="industry-select" className="form-label text-default" id={id}>
                {label}
                {required && <span className="star">*</span>}
            </label>
            <div className="form-floating">
                <textarea className="p-2" id="floatingTextarea2" rows={rows} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea