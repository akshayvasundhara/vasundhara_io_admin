import React from 'react';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';



function ViewButton({ to, state }) {

    return (
        <Link to={to} className='table-view-btn d-flex justify-content-center align-items-center' state={state}>
            <FaEye />
        </Link>
    );
}

export default ViewButton;
