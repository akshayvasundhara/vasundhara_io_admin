import React, { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { RiDeleteBinLine } from 'react-icons/ri';

function FileInput({ name, label, url, id, setImage, initialImage, onChange, required = false }) {
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (initialImage) {
            setSelectedFile(initialImage);
        }
    }, [initialImage]);

    const handleFileChange = (file) => {
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
                    name: 'video',
                    value: file,
                },
            });
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        setImage(null);
    };

    return (
        <div>
            <label htmlFor="formFile" className="form-label text-default">
                {label}
                {required && <span className="star">*</span>}
            </label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById(id).click()}
                className='drag-over'
            >
                <div className='position-relative'>
                    {selectedFile ? (
                        selectedFile?.type?.startsWith("video") ? (
                            <>
                                <div className="video-upload">
                                    <video autoPlay loop className='w-100 h-100'>
                                        <source src={selectedFile.file} type={selectedFile.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <button onClick={handleRemoveFile} className="remove-button">
                                    <RiDeleteBinLine />
                                </button>
                            </>
                        ) : (typeof selectedFile === "string" && selectedFile?.includes("videos")) && (
                            <>
                                <div className="video-upload">
                                    <video autoPlay loop className='w-100 h-100'>
                                        <source src={selectedFile} />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <button onClick={handleRemoveFile}>
                                    <RiDeleteBinLine />
                                </button>
                            </>
                        )
                    ) :
                        <div className='drag-drop-icons d-flex justify-content-center align-items-center m-auto mb-3'>
                            <MdOutlineFileUpload />
                        </div>
                    }
                    {!selectedFile && <p>Upload video</p>}
                </div>
            </div>
            <input
                className="form-control"
                name='file'
                type="file"
                id={id}
                value={""}
                accept="video/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default FileInput;
