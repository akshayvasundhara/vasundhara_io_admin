import React, { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

function MultipleImageUpload({ label, setSampled, initialImage }) {
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (initialImage) {
            setImages(initialImage); // Set the selected image if an initial image is provided
            // Create previews using FileReader for initial images if any
            const initialPreviews = initialImage.map(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return new Promise((resolve) => {
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                });
            });
            Promise.all(initialPreviews).then(previews => setImagePreviews(previews));
        }
    }, [initialImage]);

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setImages((prevImages) => {
            const updatedImages = prevImages.concat(selectedFiles); // Store file objects directly
            setSampled(updatedImages); // Notify parent about the new images

            // Create previews using FileReader for new images
            const newPreviews = selectedFiles.map(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                return new Promise((resolve) => {
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                });
            });

            // Update image previews once all file readers are done
            Promise.all(newPreviews).then(previews => {
                setImagePreviews((prevPreviews) => prevPreviews.concat(previews));
            });

            return updatedImages;
        });
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            // Remove the corresponding preview
            setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
            return updatedImages;
        });
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
                {imagePreviews.map((preview, index) => (
                    <div key={index} className="image-preview">
                        <img
                            src={preview}
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
