import React, { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { getImageURL } from '../../helper/envConfig';


function FileICon({ label, setIcon, initialIcon, onChange, name }) {
    const [selectedImage, setSelectedImage] = useState(initialIcon || null);
    const imageURL = getImageURL();

    useEffect(() => {
        if (initialIcon) {
            setSelectedImage(typeof initialIcon === 'string' ? `${imageURL}${initialIcon}` : URL.createObjectURL(initialIcon)); // Set the selected image if an initial image is provided
        }
    }, [initialIcon]);

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
        setIcon(file);
        if (onChange) {
            onChange({
                target: {
                    name: name,  // Specify the name of the input field
                    value: file,
                },
            });
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageChange(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleImageChange(file);
        }
    };

    return (
        <div>
            <label htmlFor="formFile" className="form-label text-default">
                {label}
            </label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById(name).click()}
                className='drag-over'
            >
                <div>
                    {selectedImage ? (
                        <>
                            <div className="image-upload p-4">
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className='object-fit-contain w-100 h-100'
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='drag-drop-icons d-flex justify-content-center align-items-center m-auto mb-3'>
                                <MdOutlineFileUpload />
                            </div>
                            <p>Upload Icon</p>
                        </>
                    )}
                </div>
            </div>
            <input
                className="form-control"
                type="file"
                id={name}
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }} // Hide the file input
            />
        </div>
    );
}

export default FileICon;
