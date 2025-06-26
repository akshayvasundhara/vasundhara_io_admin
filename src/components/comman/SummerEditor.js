/* global $ */  // Declare `$` as a global variable
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const SummerEditor = forwardRef(({ htmlContent, setHtmlContent }, ref) => {
    const summernoteRef = useRef(null);
    const scriptLoaded = useRef(false);

    useImperativeHandle(ref, () => ({
        getCurrentContent: () => {
            if (summernoteRef.current) {
                return $(summernoteRef.current).summernote('code');
            }
            return '';
        }
    }));

    useEffect(() => {
        if (!scriptLoaded.current) {
            scriptLoaded.current = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-bs5.min.js';
            script.async = true;

            script.onload = () => {
                $(summernoteRef.current).summernote({
                    height: 200,
                    tabsize: 2,
                    callbacks: {
                        onChange: function (contents, $editable) {
                            setHtmlContent(contents);
                        }
                    }
                });

                // Listen for codeview toggling
                $(summernoteRef.current).on('summernote.codeview.toggled', function () {
                    if (!$(summernoteRef.current).summernote('codeview.isActivated')) {
                        const contents = $(summernoteRef.current).summernote('code');
                        setHtmlContent(contents);
                    }
                });
            };

            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
                $(summernoteRef.current).summernote('destroy');
            };
        }
    }, []);

    useEffect(() => {
        if (htmlContent) {
            $(summernoteRef.current).summernote('code', htmlContent);
        }
    }, [htmlContent]);

    return (
        <div ref={summernoteRef}></div>
    );
});

export default SummerEditor;
