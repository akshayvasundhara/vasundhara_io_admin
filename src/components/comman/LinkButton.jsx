import React from 'react'
import { Link } from 'react-router-dom'

function LinkButton({ to, className, text, onClick, disabled }) {
    const buttonClassName = `${className} ${disabled ? 'btn-disabled' : ''}`;
    const handleClick = (event) => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation(); // Optionally prevent further propagation
        } else if (onClick) {
            onClick(event); // Call the provided onClick handler if not disabled
        }
    };

    return (
        <>
            <Link to={to} className={buttonClassName} onClick={handleClick} disabled={disabled}>
                {text}
            </Link>
        </>
    )
}

export default LinkButton
