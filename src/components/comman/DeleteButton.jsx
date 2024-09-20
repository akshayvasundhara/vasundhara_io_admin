import React from 'react';
import { Button } from 'react-bootstrap'; // Ensure you're using the correct import for bootstrap
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';

function DeleteButton({ id, endpoint, onSuccess }) {
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2e2e2e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            // cancelButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                // Send DELETE request to the provided API endpoint
                fetch(`${endpoint}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                            if (onSuccess) onSuccess();
                        } else {
                            throw new Error('Failed to delete.');
                        }
                    })
                    .catch(error => {
                        // console.error('Error:', error);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete the item.",
                            icon: "error"
                        });
                    });
            } else {
                Swal.fire({
                    title: "Relax Action Aborted!",
                    icon: "error"
                });
            }
        });
    };


    return (
        <Button className='table-delete-btn d-flex justify-content-center align-items-center' onClick={handleDelete}>
            <RiDeleteBinLine />
        </Button>
    );
}

export default DeleteButton;
