import React from 'react';
import { Button } from 'react-bootstrap'; // Ensure you're using the correct import for bootstrap
import { MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';



function EditButton({ to }) {

    return (
        <Link to={to} className='table-edit-btn d-flex justify-content-center align-items-center'>
            <MdOutlineEdit />
        </Link>
    );
}

export default EditButton;
