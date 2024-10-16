import React from 'react'

function Textarea({ label, rows, type, name, value, onChange, placeholder }) {
    return (
        <>
            <label htmlFor="industry-select" className="form-label text-default">
                {label}
            </label>
            <div className="form-floating">
                <textarea className="p-2" id="floatingTextarea2" rows={rows} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea
