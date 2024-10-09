import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

function MultipleImageUpload({ label, setStates, name, states }) {


    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        // setImages((prevImages) => prevImages.concat(selectedFiles)); // Store file objects directly

        setStates((prev) => {
            return {
                ...prev,
                [name]: states[name].concat(
                    selectedFiles.map((v) => ({ image: v })) // Wrap the object in parentheses
                )
            };
        });
    }

    return (
        <div>
            <div>
                <label htmlFor="formFile" className="form-label text-default">
                    {label}
                </label>
                <label className="drag-over">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    <div>
                        <div className='drag-drop-icons d-flex justify-content-center align-items-center m-auto mb-3'>
                            <MdOutlineFileUpload />
                        </div>
                        <p>Upload image</p>
                    </div>
                </label>
            </div>
            {/* <div className="image-preview-container">
                {states?.[name].map((image, index) => (
                    <div key={index} className="image-preview">
                        <img
                            src={image}
                            alt={`preview ${index}`}
                            className="preview-image"
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="remove-button"
                        >
                            <RiDeleteBinLine />
                        </button>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default MultipleImageUpload;
