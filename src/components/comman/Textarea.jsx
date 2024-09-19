import React from 'react'

function Textarea({ label, rows }) {
    return (
        <>
            <label htmlFor="industry-select" className="form-label text-default">
                {label}
            </label>
            <div className="form-floating">
                <textarea className="form-control p-2 h-auto" id="floatingTextarea2" rows={rows}></textarea>
            </div>
        </>
    )
}

export default Textarea
