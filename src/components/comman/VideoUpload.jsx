import React, { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";

function VideoUpload({ label, setVideo, initialVideo, onChange }) {
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        if (initialVideo) {
            setSelectedVideo(URL.createObjectURL(initialVideo)); // Set the selected video if an initial video is provided
        }
    }, [initialVideo]);

    const handleVideoChange = (file) => {
        const videoURL = URL.createObjectURL(file);
        setSelectedVideo(videoURL); // Set the selected video URL for preview
        setVideo(file); // Call the setVideo function with the file

        if (onChange) {
            onChange({
                target: {
                    name: 'video', // Specify the name of the input field
                    value: file,
                },
            });
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleVideoChange(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent default behavior
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleVideoChange(file);
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
                onClick={() => document.getElementById('formFile').click()}
                className='drag-over'
            >
                <div>
                    {selectedVideo ? (
                        <div className="video-upload p-4">
                            <video
                                src={selectedVideo}
                                controls
                                className='object-fit-contain w-100 h-100'
                                style={{ maxHeight: '300px' }} // Set a maximum height for the video
                            />
                        </div>
                    ) : (
                        <>
                            <div className='drag-drop-icons d-flex justify-content-center align-items-center m-auto mb-3'>
                                <MdOutlineFileUpload size={40} />
                            </div>
                            <p>Upload Video</p>
                        </>
                    )}
                </div>
            </div>
            <input
                className="form-control"
                type="file"
                id="formFile"
                accept="video/*" // Accept video files
                onChange={handleFileSelect}
                style={{ display: 'none' }} // Hide the file input
            />
        </div>
    );
}

export default VideoUpload;