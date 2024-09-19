import React from 'react';
import { Button } from 'react-bootstrap'; // Ensure you're using the correct import for bootstrap
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';

function DeleteButton() {
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5c67f7',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            // Call your delete function here
            // For example:
            // await deleteItem(itemId);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        }
    };

    return (
        <Button variant="danger" className='table-delete-btn d-flex justify-content-center align-items-center' onClick={handleDelete}>
            <RiDeleteBinLine />
        </Button>
    );
}

export default DeleteButton;
