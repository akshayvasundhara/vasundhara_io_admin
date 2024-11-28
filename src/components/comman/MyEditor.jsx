import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    Highlight,
    Bold,
    Essentials,
    Italic,
    Paragraph,
    FontColor,
    FontSize,
    CKFinderUploadAdapter,
    Autoformat,
    BlockQuote,
    CKBox,
    CKFinder,
    CloudServices,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Link,
    List,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableToolbar,
    TextTransformation,
    Base64UploadAdapter,
} from "ckeditor5";

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const MyEditor = ({ htmlData, onChangeHtmlData }) => {
    const editorContainerRef = useRef(null);
    useEffect(() => {
        const element = editorContainerRef.current;

        if (element) {
            const handleResize = debounce(() => {
                // console.log('Element resized:', element.getBoundingClientRect());
            }, 100); // Adjust the debounce delay as needed

            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(element);

            return () => {
                resizeObserver.unobserve(element);
            };
        }
    }, []);

    return (
        <div ref={editorContainerRef} >
            <CKEditor
                editor={ClassicEditor}
                config={

                    {
                        plugins: [
                            Essentials,
                            Bold,
                            Italic,
                            Paragraph,
                            Highlight,
                            CKFinderUploadAdapter,
                            Autoformat,
                            BlockQuote,
                            CKBox,
                            CKFinder,
                            CloudServices,
                            EasyImage,
                            Heading,
                            Image,
                            ImageCaption,
                            ImageStyle,
                            ImageToolbar,
                            ImageUpload,
                            Indent,
                            IndentBlock,
                            Link,
                            List,
                            PasteFromOffice,
                            PictureEditing,
                            Table,
                            TableToolbar,
                            TextTransformation,
                            Base64UploadAdapter,
                            FontColor,
                            FontSize,
                        ],
                        toolbar: {
                            items: [
                                "undo",
                                "redo",
                                "|",
                                "heading",
                                "|",
                                "bold",
                                "|",
                                "italic",
                                "|",
                                "imageUpload",
                                "bulletedList",
                                "numberedList",
                                "outdent",
                                "indent",
                                "fontColor",
                                "fontSize",
                            ],
                        },
                        image: {
                            toolbar: [
                                "imageStyle:inline",
                                "imageStyle:block",
                                "imageStyle:side",
                                "|",
                                "toggleImageCaption",
                                "imageTextAlternative",
                            ],
                        },
                        language: "en",
                        fontSize: {
                            options: [
                                "14",
                                "16",
                                "18",
                                "20",
                                "22",
                                "24",
                                "26",
                                "28",
                                "30",
                                "32",
                                "34",
                                "36",
                                "38",
                                "40",
                            ],
                        },
                        fontColor: {
                            colors: [
                                {
                                    color: "#000000",
                                    label: "Black",
                                },
                                {
                                    color: "#FF0000",
                                    label: "Red",
                                },
                                {
                                    color: "#00FF00",
                                    label: "Green",
                                },
                                {
                                    color: "#0000FF",
                                    label: "Blue",
                                },
                                // Add more colors as needed
                            ],
                        },
                        resize: 'vertical',

                    }}
                data={htmlData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    if (data !== htmlData) {
                        onChangeHtmlData(data);
                    }
                }}
            />
        </div>
    );
};

export default MyEditor;
