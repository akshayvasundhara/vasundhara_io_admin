import React, { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { getImageURL } from '../../helper/envConfig';

function FileImageVideo({ label, setImage, initialImage, name, onChange }) {
    const [selectedFile, setSelectedFile] = useState(initialImage || null);
    const imageURL = getImageURL();
    useEffect(() => {
        if (initialImage) {
            setSelectedFile(typeof initialImage === 'string' ? `${imageURL}${initialImage}` : URL.createObjectURL(initialImage));
        }
    }, [initialImage]);


    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile({
                file: reader.result,
                type: file.type,
            });

        };

        reader.readAsDataURL(file);
        setImage(file);
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
                    {selectedFile ? (
                        selectedFile?.type?.startsWith("video") ? (
                            <>
                                <div className="video-upload">
                                    <video autoPlay loop className='w-100 h-100'>
                                        <source src={selectedFile.file} type={selectedFile.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                {/* <button onClick={handleRemoveFile}>
                                    <RiDeleteBinLine />
                                </button> */}
                            </>
                        )
                            :
                            selectedFile?.type?.startsWith("image") ? (
                                <div className="image-upload">
                                    <img
                                        src={selectedFile.file}
                                        alt="Selected"
                                        className='object-fit-contain w-100 h-100'
                                    />
                                </div>
                            )
                                :
                                (typeof selectedFile === "string" && selectedFile?.endsWith("mp4")) ? (
                                    <>
                                        <div className="video-upload">
                                            <video src={selectedFile} autoPlay loop className='w-100 h-100'>
                                                {/* <source  /> */}
                                                {/* Your browser does not support the video tag. */}
                                            </video>

                                        </div>
                                    </>
                                )
                                    :
                                    <>
                                        <div className="image-upload">
                                            <img
                                                src={selectedFile}
                                                alt="Selected"
                                                className='object-fit-contain w-100 h-100'
                                            />
                                        </div>
                                    </>
                    ) :
                        <div className='drag-drop-icons d-flex justify-content-center align-items-center m-auto mb-3'>
                            <MdOutlineFileUpload />
                        </div>
                    }
                    {!selectedFile && <p>Upload image/video</p>}
                </div>
            </div>
            <input
                className="form-control"
                type="file"
                id={name} // Use the passed name for the ID
                accept="image/*, video/*" // Accept both images and videos
                onChange={handleFileSelect}
                style={{ display: 'none' }} // Hide the file input
            />
        </div>
    );
}

export default FileImageVideo;
