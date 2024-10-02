import React, { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";

function FileInputComman({ label, setImage, initialImage, name, onChange }) {
    const [selectedImage, setSelectedImage] = useState(initialImage || null);

    useEffect(() => {
        if (initialImage) {
            setSelectedImage(initialImage);
        }
    }, [initialImage]);

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
            // Call setImage to update the parent state
            setImage(file);
        };
        reader.readAsDataURL(file);

        if (onChange) {
            onChange({
                target: {
                    name: name, // Use the passed dynamic name
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
            <label className="form-label text-default">
                {label}
            </label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById(name).click()} // Use the passed name
                className='drag-over'
            >
                <div>
                    {selectedImage ? (
                        <div className="image-upload p-4">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className='object-fit-contain w-100 h-100'
                            />
                        </div>
                    ) : (
                        <div className='drag-drop-icons d-flex justify-content-center align-items-center m-auto mb-3'>
                            <MdOutlineFileUpload />
                            <p>Upload image</p>
                        </div>
                    )}
                </div>
            </div>
            <input
                className="form-control"
                type="file"
                id={name} // Use the passed name for the ID
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }} // Hide the file input
            />
        </div>
    );
}

export default FileInputComman;
