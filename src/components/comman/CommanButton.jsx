import React from 'react';



function CommanButton({ className, text }) {

    return (
        <button className={className}>
            {text}
        </button>
    );
}

export default CommanButton;
