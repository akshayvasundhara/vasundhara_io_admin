import React from 'react';
import { Button } from 'react-bootstrap'; // Ensure you're using the correct import for bootstrap
import { MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';



function EditButton({ to, state }) {

    return (
        <Link to={to} className='table-edit-btn d-flex justify-content-center align-items-center' state={state} >
            <MdOutlineEdit />

        </Link>
    );
}

export default EditButton;
