import React from 'react';



function CommanButton({ className, text, handleSubmit }) {

    return (
        <button className={className} onClick={handleSubmit}>
            {text}
        </button>
    );
}

export default CommanButton;
