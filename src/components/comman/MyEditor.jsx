import React, { useEffect, useRef } from "react";
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
    LinkEditing,
    LinkUI,
    List,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableToolbar,
    TextTransformation,
    Base64UploadAdapter,
    SourceEditing
} from "ckeditor5";

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const MyEditor = ({ htmlData, onChangeHtmlData, className = "" }) => {
    const editorContainerRef = useRef(null);

    useEffect(() => {
        const element = editorContainerRef.current;

        if (element) {
            const handleResize = debounce(() => {
            }, 100);

            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(element);

            return () => {
                resizeObserver.unobserve(element);
            };
        }
    }, []);

    return (
        <div className={className && "ctm-editor"}
            ref={editorContainerRef}>
            <CKEditor
                editor={ClassicEditor}
                config={{
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
                        LinkEditing,
                        LinkUI,
                        List,
                        PasteFromOffice,
                        PictureEditing,
                        Table,
                        TableToolbar,
                        TextTransformation,
                        Base64UploadAdapter,
                        FontColor,
                        FontSize,
                        SourceEditing
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
                            "sourceEditing",
                            "link"
                        ],
                    },
                    link: {
                        addTargetToExternalLinks: true,
                        decorators: {
                            openInNewTab: {
                                mode: 'manual',
                                label: 'Open link in a new tab',
                                attributes: {
                                    target: '_blank',
                                    rel: 'noopener noreferrer'
                                }
                            }
                        }
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
                            "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "36", "38", "40",
                        ],
                    },
                    fontColor: {
                        colors: [
                            { color: "#000000", label: "Black" },
                            { color: "#FF0000", label: "Red" },
                            { color: "#00FF00", label: "Green" },
                            { color: "#0000FF", label: "Blue" },
                            // Add more colors as needed
                        ],
                    },
                    resize: 'vertical',
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Normal', className: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', className: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', className: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', className: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Heading 4', className: 'ck-heading_heading4' },
                            { model: 'heading5', view: 'h5', title: 'Heading 5', className: 'ck-heading_heading5' },
                            { model: 'heading6', view: 'h6', title: 'Heading 6', className: 'ck-heading_heading6' },
                        ]
                    },
                    htmlEmbed: {
                        showPreviews: true
                    },
                    htmlSupport: {
                        allow: [
                            {
                                name: /.*/,
                                attributes: true,
                                classes: true,
                                styles: true,
                            }
                        ],
                        disallow: [
                            {
                                attributes: [
                                    { key: /.*/, value: /data:(?!image\/(png|jpeg|gif|webp))/i }
                                ]
                            }
                        ]
                    },
                }}
                data={htmlData || ""}
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