import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

function MultipleImageUpload({ label }) {
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(imagePreviews));
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

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
            <div className="image-preview-container">
                {images.map((image, index) => (
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
            </div>
        </div>
    );
}

export default MultipleImageUpload;
