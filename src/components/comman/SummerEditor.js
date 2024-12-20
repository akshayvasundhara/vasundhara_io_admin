/* global $ */  // Declare `$` as a global variable
import React, { useEffect, useState, useRef } from 'react';

const SummerEditor = ({ htmlContent, setHtmlContent, id }) => {
    const scriptLoaded = useRef(false); // Use useRef to track script loading

    useEffect(() => {
        // Load the Summernote script only once
        if (!scriptLoaded.current) {
            scriptLoaded.current = true;

            // Create a script tag for Summernote
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-bs5.min.js';
            script.async = true;

            script.onload = () => {
                // Initialize Summernote when the script is loaded
                $(`#${id}`).summernote({
                    height: 200,
                    tabsize: 2,
                    callbacks: {
                        onChange: function (contents, $editable) {
                            setHtmlContent(contents); // Update the content on change
                        }
                    }
                });
            };

            // Append the script to the body
            document.body.appendChild(script);

            // Cleanup on unmount: remove script and destroy Summernote instance
            return () => {
                document.body.removeChild(script);
                $(`#${id}`).summernote('destroy');
            };
        }
    }, [id, setHtmlContent]); // Only re-run if id or setHtmlContent changes

    useEffect(() => {
        // When the htmlContent changes, update Summernote content
        if (htmlContent) {
            $(`#${id}`).summernote('code', htmlContent);
        }
    }, [htmlContent, id]); // Re-run if htmlContent or id changes

    return (
        <div id={id}>{htmlContent}</div>
    );
};

export default SummerEditor;
