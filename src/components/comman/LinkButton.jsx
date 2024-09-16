import React from 'react'
import { Link } from 'react-router-dom'

function LinkButton({ to, className, text }) {
    return (
        <>
            <Link to={to} className={className}>
                {text}
            </Link>
        </>
    )
}

export default LinkButton
