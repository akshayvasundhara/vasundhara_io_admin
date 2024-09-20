import React from 'react'

function Textarea({ label, rows, type, name, value, onChange }) {
    return (
        <>
            <label htmlFor="industry-select" className="form-label text-default">
                {label}
            </label>
            <div className="form-floating">
                <textarea className="form-control p-2 h-auto" id="floatingTextarea2" rows={rows} type={type} name={name} value={value} onChange={onChange}></textarea>
            </div>
        </>
    )
}

export default Textarea
