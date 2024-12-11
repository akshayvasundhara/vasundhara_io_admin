
import React, { Fragment, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import Textarea from '../../components/comman/Textarea';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import api from '../../API/api';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidateFields } from '../../components/validate/ValidateFields';
import ErrorFilter from '../../helper/errorFilter';
import SingleError from '../../helper/SingleError';
import { errorResponse } from '../../helper/error';
import { toast } from 'react-toastify';
import LoaderComman from '../../components/comman/LoaderComman';
import FileInput from '../../components/comman/FileInput';
import LableInput from '../../components/comman/LableInput';
import SelectInput from '../../components/comman/SelectInput';
import { PiPlusBold } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';
import VideoUpload from '../../components/comman/VideoUpload';
import MultipleImageUpload from '../../components/comman/MultipleInageUpload';
import { BlogValidates } from '../../components/validate/BlogValidate'
import PlushLableInput from '../../components/comman/PlushLableInput';
import FileInputComman from '../../components/comman/FileInputComman';

const requireField = [
    "title",
    "sub_title",
    "desc",
    "tags",
    "image",
    "details",
    "solution",
    "solution_main_title",
    "client"
];

const clientRequireField = [
    "name",
    "designation",
    "image",
    "feedback"
]

function AddCaseStudiesIndex() {
    const location = useLocation();
    const state = location.state || {};

    const navigate = useNavigate();
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [mainLoader, setMainLoader] = useState(false);
    const [options, setOptions] = useState([]);
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitCount, setSubmitCount] = useState(0);
    const [image, setImage] = useState(null);

    const [status, setStatus] = useState(state.status !== undefined ? state.status : 1);
    const [states, setStates] = useState({
        title: '',
        sub_title: '',
        // author: '',
        status: '',
        play_store_link: '',
        app_store_link: '',
        desc: '',
        tags: [''],
        // industry: [{ title: '', desc: '', image: null }],
        // features: [{ title: '', desc: '', image: null }],
        content: [{ title: '', desc: '', image: null }],
        details: [{ key: '', value: '' }],
        solution_main_title: "",
        solution: [{ title: '', desc: '' }],
        process: [{ image: null, title: '' }],
        technology: { tech: [''], title: '' },
        client: { feedback: '', name: '', designation: '', image: null },
        // faqs: [{ question: '', answer: '' }],
        // sample_screen_images: [],
        other_images: [],
    });

    // Function to handle the toggle switch
    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0));
    };

    // Close Case Studies
    const closeFaq = async (e) => {
        setStates({});
        navigate('/case-studies');
    }

    // Get State 
    useEffect(() => {
        if (state && Object.keys(state)?.length > 0) {
            setStates({
                title: state?.title,
                sub_title: state?.sub_title,
                // author: state.author._id,
                status: state?.status,
                play_store_link: state?.play_store_link,
                app_store_link: state?.app_store_link,
                desc: state?.desc,
                tags: state?.tags || [''],
                // industry: state.industry || [''],
                // features: state.features || [''],
                content: state?.content?.length ? state?.content : [{ title: '', desc: '', image: null }],
                // faqs: state?.faqs || [''],
                details: state?.details?.length ? state?.details : [{ key: '', value: '' }],
                solution_main_title: state?.solution_main_title || '',
                solution: state?.solution?.length ? state?.solution : [{ title: '', desc: '' }],
                process: state?.process?.length ? state?.process : [{ image: null, title: '' }],
                technology: state?.technology || { tech: [''], title: '' },
                client: Object.keys(state?.client)?.length ? state?.client : { feedback: '', name: '', designation: '', image: null },
            });

            if (state.image) {
                // const fullImageUrl = `${imageURL}${state.image}`;
                setImage(state.image);
            }

            if (state.video) {
                // const fullVideoUrl = `${imageURL}${state.video}`;
                setVideo(state.video);
            } else {
                setVideo(null); // Clear video if there's no valid video
            }

            if (state.industry && Array.isArray(state.industry)) {
                const updatedIndustry = state.industry.map(ind => ({
                    ...ind,
                    // image: ind.image ? `${imageURL}${ind.image}` : null // Construct full image URL
                    image: ind.image ? ind.image : null
                }));
                setStates(prev => ({ ...prev, industry: updatedIndustry }));
            }

            // Set content images
            // if (state.content && Array.isArray(state.content)) {
            //     const updatedContent = state.content.map(cont => ({
            //         ...cont,
            //         image: cont.image ? cont.image : null // Construct full image URL
            //     }));
            //     setStates(prev => ({ ...prev, content: updatedContent }));
            // }

            // Set features images
            // if (state.features && Array.isArray(state.features)) {
            //     const updatedFeatures = state.features.map(feat => ({
            //         ...feat,
            //         image: feat.image ? feat.image : null // Construct full image URL
            //     }));
            //     setStates(prev => ({ ...prev, features: updatedFeatures }));
            // }

            // set sample images
            // if (state.sample_screen_images && Array.isArray(state.sample_screen_images)) {
            //     const updatedSample = state.sample_screen_images.map(samp => ({
            //         ...samp,
            //         // image: samp.image ? `${imageURL}${samp.image}` : null
            //         image: samp.image ? samp.image : null
            //     }))
            //     setStates(prev => ({ ...prev, sample_screen_images: updatedSample }));
            // }

            // set sample images
            // if (state.other_images && Array.isArray(state.other_images)) {
            //     const updatedSample = state.other_images.map(oth => ({
            //         ...oth,
            //         image: oth.image ? oth.image : null
            //     }))
            //     setStates(prev => ({ ...prev, other_images: updatedSample }));
            // }
        }
    }, [state, options]);

    // Get FAQ Type
    const getOptions = async () => {
        try {
            const response = await api.getWithToken(`${serverURL}/team?status=1`)
            if (response.data.success === true) {
                setOptions(response.data.data.data || []);
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getOptions();
    }, [])

    const teamOptions = options.map(member => ({
        value: member._id,
        label: member.name
    }));

    const handleAddTags = () => {
        setStates((prevStates) => ({
            ...prevStates,
            tags: [...prevStates.tags, ''], // Add a new empty tag field
        }));
    }

    const handleAddClient = () => {
        setStates((prevStates) => ({
            ...prevStates,
            client: [...prevStates?.client, { desc: '', image: null, author: '', designation: '' }], // Add a new empty tag field
        }));
    };
    const handleAddIndustry = () => {
        setStates((prevStates) => ({
            ...prevStates,
            industry: [...prevStates.industry, { title: '', desc: '', image: null }],
        }));
    };

    const handleAddFeature = () => {
        setStates((prevStates) => ({
            ...prevStates,
            features: [...prevStates.features, { title: '', desc: '', image: null }],
        }));
    };

    const handleAddContent = () => {
        const data = states?.content
        if (data?.length > 0) {
            if (data[data?.length - 1]?.title !== '' && data[data?.length - 1]?.desc !== '' && data[data?.length - 1]?.image !== null) {
                setStates((prevStates) => ({
                    ...prevStates,
                    content: [...prevStates.content, { name: '', desc: '', image: null }],
                }));
            }
            else {
                alert('Please enter title, description and image');
            }
        }
    };

    const handleAddFaqs = () => {
        setStates((prevStates) => ({
            ...prevStates,
            faqs: [...prevStates.faqs, { question: '', answer: '' }],
        }));
    };

    const handleAddSolutions = () => {
        const data = states?.solution
        if (data?.length > 0) {
            if (data[data?.length - 1]?.title !== '' && data[data?.length - 1]?.desc !== '') {
                setStates((prevStates) => ({
                    ...prevStates,
                    solution: [...prevStates.solution, { title: '', desc: '' }],
                }));
            }
            else {
                alert('Please enter title and description');
            }
        }
        // setStates((prevStates) => ({
        //     ...prevStates,
        //     solution: [...prevStates.solution, { title: '', desc: '' }],
        // }));
    };

    const handleAddProcess = () => {
        const data = states?.process
        if (data?.length > 0) {
            if (data[data?.length - 1]?.image !== null && !data[data?.length - 1]?.title !== '') {
                setStates((prevStates) => ({
                    ...prevStates,
                    process: [...prevStates.process, { image: null, title: '' }],
                }));
            }
            else {
                alert('Please enter image and title');
            }
        }
        // setStates((prevStates) => ({
        //     ...prevStates,
        //     process: [...prevStates.process, { image: '', title: '' }],
        // }));
    };


    const handleAddDetails = () => {
        const data = states?.details
        if (data?.length > 0) {
            if (data[data?.length - 1]?.key !== '' && !data[data?.length - 1]?.value !== '') {
                setStates((prevStates) => ({
                    ...prevStates,
                    details: [...prevStates.details, { key: '', value: '' }]
                }));
            }
            else {
                alert('Please enter key and value');
            }
        }
    };
    // Handle adding a new technology name
    const handleAddTechnology = () => {
        setStates((prevStates) => ({
            ...prevStates,
            technology: {
                ...prevStates.technology,
                tech: [...prevStates.technology.tech, ''], // Add an empty technology name to the list
            },
        }));
    };

    const handleRemoveIndustry = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            industry: prevStates.industry.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveFeature = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            features: prevStates.features.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveContent = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            content: prevStates.content.filter((_, i) => i !== index), // Remove the tag at the specified index
        }));
    };
    const handleRemoveFaqs = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            faqs: prevStates.faqs.filter((_, i) => i !== index), // Remove the tag at the specified index
        }));
    };
    const handleRemoveDetails = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            details: prevStates.details.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveSolutions = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            solution: prevStates.solution.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveProcess = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            process: prevStates.process.filter((_, i) => i !== index),
        }));
    };

    // const handleRemoveTechnology = (index) => {
    //     setStates((prevStates) => ({
    //         ...prevStates,
    //         technology: [{
    //             ...prevStates.technology[0],
    //             tech: prevStates.technology[0].tech.filter((_, i) => i !== index),
    //         }],
    //     }));
    // };

    const handleRemoveTechnology = (index) => {
        setStates((prevStates) => {
            const updatedTechnology = [...prevStates.technology.tech];
            updatedTechnology.splice(index, 1); // Remove the item at the specified index
            return {
                ...prevStates,
                technology: {
                    ...prevStates.technology,
                    tech: updatedTechnology,
                },
            };
        });
    };

    // const handleArrayChange1 = (path, index, value) => {
    //     setStates((prevStates) => {
    //         const updatedTechnology = [...prevStates.technology];
    //         updatedTechnology[0].tech[index] = { ...updatedTechnology[0].tech[index], name: value };
    //         return { ...prevStates, technology: updatedTechnology };
    //     });
    // };

    const handleArrayChange1 = (index, value) => {
        setStates((prevStates) => {
            const updatedTechnology = [...prevStates.technology.tech];
            updatedTechnology[index] = value;
            return {
                ...prevStates,
                technology: {
                    ...prevStates.technology,
                    tech: updatedTechnology,
                },
            };
        });
    };

    const handleTitleChange = (e) => {
        setStates((prevStates) => ({
            ...prevStates,
            technology: {
                ...prevStates.technology,
                title: e.target.value,
            },
        }));
    };

    const handleRemoveTags = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            tags: prevStates.tags.filter((_, i) => i !== index)
        })
        )
    };
    const handleChange = async (e) => {
        const { name, value, checked, type, files } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        if (submitCount > 0) {
            let validationErrors = BlogValidates({ ...states, [name]: value });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
            }
        }

        if (type === "file") {
            setStates((prevStates) => ({
                ...prevStates,
                client: {
                    ...prevStates.client,
                    [name]: files[0]
                }
            }));
        } else if (name.startsWith('client_')) {
            setStates((prevStates) => ({
                ...prevStates,
                client: {
                    ...prevStates.client,
                    [name.split('_')[1]]: value // Update the correct client field
                }
            }));
        } else {
            setStates((prevValues) => ({
                ...prevValues,
                [name]: newValue,
            }));
        }
    };

    const handleClientChange = async (e) => {
        const { name, value, checked, type, files } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        console.log();


        // Only trigger validation on submit
        if (submitCount > 0) {
            const validationErrors = BlogValidates({ ...states, client: { ...states?.client, [name]: newValue } });
            const filteredErrors = ErrorFilter(validationErrors, requireField) || {};
            setErrors(filteredErrors);
            // If there are no errors, remove error for this field

            if (Object.keys(filteredErrors)?.length === 0) {
                // console.log('errors?.client[name]: ',name,errors?.client);
                // delete errors?.client[name];
                // setErrors((prevErrors) => {
                //     // const { [name]: omitted, ...restErrors } = prevErrors;
                //     // return restErrors;
                // });
            }
        }

        // Handle file input separately
        if (type === "file") {
            setStates((prevStates) => ({
                ...prevStates,
                client: {
                    ...prevStates?.client,
                    [name]: files[0], // Assuming only one file is selected
                },
            }));
        } else {
            // For other input types (text, checkbox, etc.)
            setStates((prevStates) => ({
                ...prevStates,
                client: {
                    ...prevStates?.client,
                    [name]: newValue,
                },
            }));
        }
    };

    // Handle array change for tags
    const handleArrayChange = (name, newValues) => {
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValues,
        }));

        if (submitCount > 0) {
            const updatedValues = { ...states, [name]: newValues };
            let validationErrors = BlogValidates(updatedValues);
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
            }
        }
    };

    const handleImageChange = (type, index) => (file) => {
        const updatedArray = [...states[type]]; // Create a copy of the specified array
        updatedArray[index].image = file; // Update the specific index for the image
        setStates({ ...states, [type]: updatedArray }); // Update the state with the modified array
    };

    const isValidationErrorsEmpty = (validationErrors) => {
        return Object.keys(validationErrors).every(key => {
            const error = validationErrors[key];
            return Array.isArray(error) ? error.length === 0 : !error; // Ignore empty arrays
        });
    };

    const addCases = async (e) => {
        e.preventDefault();
        setSubmitCount(prevCount => prevCount + 1);

        const updatedValues = { ...states, image, video, status };

        let validationErrors = BlogValidates(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);

        if (image) {
            delete errors.image;
        }

        setErrors(validationErrors);
        if (states?.play_store_link) {
            const playStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
            if (!playStoreUrlPattern.test(states?.play_store_link)) {
                validationErrors.play_store_link = "Invalid Play Store link";
            }
        }

        if (states?.app_store_link) {
            const appStoreUrlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
            if (!appStoreUrlPattern.test(states?.app_store_link)) {
                validationErrors.app_store_link = "Invalid App Store link";
            }
        }

        validationErrors.content = validationErrors.content || [];
        validationErrors.process = validationErrors.process || [];

        if (Array.isArray(updatedValues?.content)) {
            updatedValues.content.forEach((item, index) => {
                const { title, desc, image } = item;
                let contentErrors = {};

                // Check if any field is filled and validate
                if (title || desc || image) {
                    if (!title) contentErrors.title = "Title is required if any field is filled";
                    if (!desc) contentErrors.desc = "Description is required if any field is filled";
                    if (!image) contentErrors.image = "Image is required if any field is filled";
                }

                // Only assign contentErrors if it has any errors
                if (Object.keys(contentErrors).length > 0) {
                    validationErrors.content[index] = contentErrors;
                }
            });

            // Remove content entry if it's empty
            if (validationErrors.content.every((error) => Object.keys(error).length === 0)) {
                delete validationErrors.content;
            }
        }

        if (Object.keys(validationErrors)?.length) {
            Object.entries(validationErrors)?.map(([key], i) => {
                if (i == 0)
                    document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
            });
        }

        if (Array.isArray(updatedValues?.process)) {
            updatedValues.process.forEach((item, index) => {
                const { title, image } = item;
                let processErrors = {};

                // Check if any field is filled and validate
                if (title || image) {
                    if (!title) processErrors.title = "Title is required if any field is filled";
                    if (!image) processErrors.image = "Image is required if any field is filled";
                }

                // Only assign processErrors if it has any errors
                if (Object.keys(processErrors).length > 0) {
                    validationErrors.process[index] = processErrors;
                }
            });

            // Remove process entry if it's empty
            if (validationErrors.process.every((error) => Object.keys(error).length === 0)) {
                delete validationErrors.process;
            }
        }


        if (isValidationErrorsEmpty(validationErrors)) {
            try {
                const formData = new FormData();
                formData.append('title', updatedValues.title);
                formData.append('sub_title', updatedValues.sub_title);
                formData.append('author', updatedValues.author ? updatedValues.author : teamOptions[0].value);
                if (updatedValues.play_store_link) {
                    formData.append('play_store_link', updatedValues.play_store_link);
                }
                if (updatedValues.app_store_link) {
                    formData.append('app_store_link', updatedValues.app_store_link);
                }
                if (updatedValues.desc) {
                    formData.append('desc', updatedValues.desc);
                }
                formData.append('status', status);
                formData.append('image', image);
                formData.append('video', video);
                if (Array.isArray(updatedValues.tags) && updatedValues.tags.length > 0) {
                    updatedValues.tags.forEach((tag, index) => {
                        if (tag && tag.trim().length > 0) {
                            formData.append(`tags[${index}]`, tag);
                        }
                    });
                }

                // Append FAQs
                if (Array.isArray(updatedValues.faqs)) {
                    updatedValues.faqs.forEach((faq, index) => {
                        if (faq.question && faq.answer) {
                            formData.append(`faqs[${index}][question]`, faq.question);
                            formData.append(`faqs[${index}][answer]`, faq.answer);
                        }
                    });
                }

                // Append FAQs
                if (Array.isArray(updatedValues?.details)) {
                    updatedValues?.details?.forEach((detail, index) => {
                        if (detail?.key && detail?.value) {
                            formData.append(`details[${index}][key]`, detail.key);
                            formData.append(`details[${index}][value]`, detail.value);
                        }
                    });
                }

                formData.append('technology[title]', updatedValues?.technology.title);

                // Iterate over the "tech" array and append each technology name
                updatedValues?.technology?.tech.forEach((techItem, index) => {
                    formData.append(`technology[tech][${index}]`, techItem);
                });

                formData.append('solution_main_title', updatedValues.solution_main_title);
                // Append solutions if not empty
                if (Array.isArray(updatedValues.solution)) {
                    updatedValues.solution.forEach((solution, index) => {
                        if (solution.title && solution.desc) {
                            formData.append(`solution[${index}][title]`, solution.title);
                            formData.append(`solution[${index}][desc]`, solution.desc);
                        }
                    });
                }

                // Append process if not empty
                if (Array.isArray(updatedValues.process)) {
                    updatedValues.process.forEach((process, index) => {
                        if (process?.title && process.image) {
                            formData.append(`process[${index}][title]`, process?.title);
                            if (process?._id)
                                formData.append(`process[${index}][_id]`, process?._id);
                            formData.append(`process[${index}][image]`, process?.image?.name ? process?.image?.name : process?.image);
                            formData.append(`process_image`, process?.image);
                        }

                    });
                }

                // Append client fields to FormData
                Object.entries(states.client).forEach(([key, value]) => {
                    // Append the client properties individually under the "client" key
                    if (value) { // Only append if there is a value
                        if (key === 'image' && value instanceof File) {
                            formData.append(`client_image`, value); // Append the file under client[image]
                        } else {
                            formData.append(`client[${key}]`, value); // Append text fields under client[name], client[feedback], etc.
                        }
                    }
                });

                // Append features if not empty
                // if (Array.isArray(updatedValues.features)) {
                //     updatedValues.features.forEach((feature, index) => {
                //         if (feature.title) {
                //             formData.append(`features[${index}][title]`, feature.title);

                //             // Append desc only if it exists
                //             if (feature.desc) {
                //                 formData.append(`features[${index}][desc]`, feature.desc);
                //             }
                //             if (state._id) {
                //                 if (feature.image && feature.image.name) {
                //                     formData.append(`features[${index}][image]`, feature.image.name);
                //                     formData.append('feature_image', feature.image || '');
                //                 } else {
                //                     formData.append(`features[${index}][_id]`, feature._id);
                //                     formData.append(`features[${index}][image]`, feature.image || '');
                //                     if (feature.image.name) {
                //                         formData.append('feature_image', feature.image || '');
                //                     }
                //                 }
                //             } else {
                //                 formData.append(`features[${index}][image]`, feature.image ? feature.image.name : '');
                //                 formData.append('feature_image', feature.image || '');
                //             }
                //         }
                //     });
                // }

                // Append industry if not empty
                // if (Array.isArray(updatedValues.industry)) {
                //     updatedValues.industry.forEach((ind, index) => {
                //         if (ind.title && ind.desc) {
                //             formData.append(`industry[${index}][title]`, ind.title);
                //             formData.append(`industry[${index}][desc]`, ind.desc);
                //             if (state._id) {
                //                 if (ind.image && ind.image.name) {
                //                     formData.append('industry_image', ind.image || '');
                //                     formData.append(`industry[${index}][image]`, ind.image.name);
                //                 } else {
                //                     formData.append(`industry[${index}][_id]`, ind._id);
                //                     formData.append(`industry[${index}][image]`, ind.image || '');
                //                     if (ind.image.name) {
                //                         formData.append('industry_image', ind.image || '');
                //                     }
                //                 }
                //             } else {
                //                 formData.append(`industry[${index}][image]`, ind.image ? ind.image.name : '');
                //                 formData.append('industry_image', ind.image || '');
                //             }
                //         }
                //     });
                // }

                // Append content if not empty
                if (Array.isArray(updatedValues.content)) {
                    updatedValues.content.forEach((cont, index) => {
                        if (cont.title && cont.desc) {
                            formData.append(`content[${index}][title]`, cont.title);
                            formData.append(`content[${index}][desc]`, cont.desc);
                            // formData.append(`content[${index}][redirect_link]`, cont.redirect_link);
                            if (state._id) {
                                if (cont.image && cont.image.name) {
                                    formData.append(`content[${index}][image]`, cont.image.name);
                                    formData.append('content_image', cont.image || '');
                                } else {
                                    formData.append(`content[${index}][_id]`, cont._id);
                                    formData.append(`content[${index}][image]`, cont.image || '');
                                    if (cont.image.name) {
                                        formData.append('content_image', cont.image || '');

                                    }
                                }
                            } else {
                                formData.append(`content[${index}][image]`, cont.image ? cont.image.name : '');
                                formData.append('content_image', cont.image || '');
                            }
                        }
                    });
                }

                // if (Array.isArray(updatedValues.sample_screen_images)) {
                //     updatedValues.sample_screen_images.forEach((samp, index) => {

                //         if (state._id) {
                //             if (samp.image) {
                //                 if (samp._id) {
                //                     formData.append(`sample_screen_images[${index}][image]`, samp.image);
                //                     formData.append(`sample_screen_images[${index}][_id]`, samp._id);
                //                 } else {
                //                     formData.append(`sample_screen_images[${index}][image]`, samp.image.name);
                //                     formData.append('sample_image', samp.image);
                //                 }
                //             }
                //         } else {
                //             formData.append('sample_image', samp.image);
                //         }

                //     });
                // }
                // Append other_images
                // if (Array.isArray(updatedValues.other_images)) {
                //     updatedValues.other_images.forEach((oth, index) => {
                //         if (state._id) {
                //             if (oth.image) {
                //                 if (oth._id) {
                //                     formData.append(`other_images[${index}][image]`, oth.image);
                //                     formData.append(`other_images[${index}][_id]`, oth._id);
                //                 } else {
                //                     formData.append(`other_images[${index}][image]`, oth.image.name);
                //                     formData.append('other_image', oth.image);
                //                 }
                //             }
                //         } else {
                //             formData.append('other_image', oth.image);
                //         }
                //     });
                // }

                setMainLoader(true); // Start loader
                let response;
                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/case-study/${state._id}`, formData);
                } else {
                    response = await api.postWithToken(`${serverURL}/case-study`, formData);
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/case-studies');
                } else if (response?.data?.success === false) {
                    if (typeof response?.data?.message === "string") {
                        toast.error(response?.data?.message);
                    }
                }
            } catch (error) {
                setMainLoader(false);
                errorResponse(error);
            } finally {
                setMainLoader(false);
            }
        }
    };

    const handleRemoveImage = (e, index, name) => {
        e.preventDefault()
        setStates((prev) => {
            return { ...prev, [name]: states[name].filter((_, i) => i !== index) }
        })
    };
    const handleImageChange1 = (image) => (file) => {
        setStates((prevStates) => ({
            ...prevStates,
            client: {
                ...prevStates.client,
                [image]: file,  // Dynamically setting the image field
            },
        }));
    };

    console.log(errors, "erro000rs");


    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/case-studies' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>{location.pathname === '/case-studies-add' ? 'Add Case Study' : 'Edit Case Study'} </h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <form action="">
                                        <Row className='g-3'>
                                            <Col md={12}>
                                                <LableInput
                                                    required={true}
                                                    label="Title"
                                                    className="form-control"
                                                    id="title"
                                                    placeholder="Enter title"
                                                    type="text"
                                                    name='title'
                                                    value={states?.title || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.title} />
                                            </Col>
                                            <Col md={12}>
                                                <LableInput
                                                    required={true}
                                                    label="Subtitle"
                                                    className="form-control"
                                                    id="sub_title"
                                                    placeholder="Enter subtitle"
                                                    type="text"
                                                    name='sub_title'
                                                    value={states?.sub_title || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.sub_title} />
                                            </Col>
                                            {/* <Col md={12}>
                                                <SelectInput label="Author:" options={teamOptions} name="author"  // Add name here
                                                    value={states.author}  // Bind to the state
                                                    onChange={handleChange} />
                                            </Col> */}
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="Google Play Store"
                                                    className="form-control"
                                                    id="play_store_link"
                                                    placeholder="Enter google play store link"
                                                    type="text"
                                                    name='play_store_link'
                                                    value={states?.play_store_link || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.play_store_link} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="App Store"
                                                    className="form-control"
                                                    id="app_store_link"
                                                    placeholder="Enter app store link"
                                                    type="text"
                                                    name='app_store_link'
                                                    value={states?.app_store_link || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.app_store_link} />
                                            </Col>
                                            <Col md={12}>
                                                <Textarea label="Description" id={'desc'} rows="4" type="text" name="desc" value={states.desc || ""}
                                                    onChange={handleChange} placeholder="Enter description"
                                                />
                                                <SingleError error={errors?.desc} />
                                            </Col>

                                            <Col md={12}>
                                                <div className='d-xl-flex align-items-start gap-3'>
                                                    <div className='d-md-flex align-items-start gap-3'>
                                                        <div className='team_images'>
                                                            <FileInput required={true} label="Banner" name="image" id="image" setImage={setImage} initialImage={image !== null && `${imageURL}${image}`} onChange={handleChange} />
                                                            <SingleError error={errors?.image} />
                                                        </div>
                                                        {/* <div className='mt-3 mt-md-0'>
                                                            <VideoUpload
                                                                label="Video"
                                                                setVideo={setVideo}
                                                                initialVideo={video !== null && `${imageURL}${video}`}
                                                                onChange={handleChange}
                                                            />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title mb-0'>Tags</h5>
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddTags}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>
                                            {states?.tags?.map((tag, index) => (
                                                <Col md={12} key={index + "tag"}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100 mt-3'>
                                                        <div className='w-100 mt-3 mt-md-0 d-flex align-items-center gap-2'>
                                                            <div className='d-flex align-items-end gap-2 w-100 label-none'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        className="form-control w-100"
                                                                        id={`tags[${index}]`}
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`tags[${index}]`}
                                                                        value={tag || ''}
                                                                        onChange={(e) =>
                                                                            handleArrayChange('tags', [
                                                                                ...states.tags.slice(0, index),
                                                                                e.target.value,
                                                                                ...states.tags.slice(index + 1)
                                                                            ])
                                                                        }
                                                                    />
                                                                    <SingleError error={errors.tags?.[index]} />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveTags(index)}
                                                                    className="btn btn-danger py-2">
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                            <SingleError error={errors?.tags} />
                                            {/* {states?.tags?.map((tag, index) => (
                                                <Col md={12} key={index}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div className='w-100 mt-3 mt-md-0 d-flex align-items-center gap-2'>
                                                            <div className='d-flex align-items-end gap-2 w-100 label-none'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        className="form-control w-100"
                                                                        id={`tags[${index}]`}
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`tags[${index}]`}
                                                                        value={tag || ''}
                                                                        onChange={(e) =>
                                                                            handleArrayChange('tags', [
                                                                                ...states.tags.slice(0, index),
                                                                                e.target.value,
                                                                                ...states.tags.slice(index + 1)
                                                                            ])
                                                                        }
                                                                    />
                                                                    <SingleError error={errors.tags?.[index]} />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveTags(index)}
                                                                    className="btn btn-danger py-2">
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col> */}

                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        {/* <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Industry:</h5>
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddIndustry}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>
                                            {states.industry.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={index}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileInputComman
                                                                label="Image:"
                                                                setImage={handleImageChange('industry', index)}
                                                                initialImage={ind.image || ''}
                                                                name={`industry[${index}][image]`}
                                                            />
                                                            <SingleError error={errors.industry?.[index]?.image} />
                                                        </div>
                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <div className='d-flex align-items-end gap-2'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        label="Title:"
                                                                        className="form-control"
                                                                        id={`industry-title-${index}`}
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`industry[${index}][title]`}
                                                                        value={ind.title || ''}
                                                                        onChange={(e) => handleArrayChange('industry', [...states.industry.slice(0, index), { ...ind, title: e.target.value }, ...states.industry.slice(index + 1)])} // Use handleArrayChange
                                                                    />
                                                                    <SingleError error={errors.industry?.[index]?.title} />
                                                                </div>
                                                            </div>
                                                            <div className='mt-3'>
                                                                <Textarea
                                                                    label="Description:"
                                                                    rows="4"
                                                                    type="text"
                                                                    placeholder="Enter description"
                                                                    name={`industry[${index}][desc]`}
                                                                    value={ind.desc || ''}
                                                                    onChange={(e) => handleArrayChange('industry', [...states.industry.slice(0, index), { ...ind, desc: e.target.value }, ...states.industry.slice(index + 1)])} // Use handleArrayChange
                                                                />
                                                                <SingleError error={errors.industry?.[index]?.desc} />
                                                            </div>
                                                            <div className="d-flex justify-content-end mt-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveIndustry(index)} // Ensure `ind.id` is valid
                                                                    className="btn btn-danger py-2"
                                                                >
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row> */}

                                        {/* <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Features:</h5>
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddFeature}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>
                                            {states.features.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={index}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileInputComman
                                                                label="Image:"
                                                                setImage={handleImageChange('features', index)}
                                                                initialImage={ind.image || ''}
                                                                name={`features[${index}][image]`}
                                                            />
                                                            <SingleError error={errors.features?.[index]?.image} />
                                                        </div>

                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <div className='d-flex align-items-end gap-2'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        label="Title:"
                                                                        className="form-control"
                                                                        id={`industry-title-${index}`}
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`features[${index}][title]`}
                                                                        value={ind.title || ''}
                                                                        onChange={(e) => handleArrayChange('features', [...states.features.slice(0, index), { ...ind, title: e.target.value }, ...states.features.slice(index + 1)])} // Use handleArrayChange
                                                                    />
                                                                    <SingleError error={errors.features?.[index]?.title} />
                                                                </div>
                                                            </div>
                                                            <div className='mt-3'>
                                                                <Textarea
                                                                    label="Description:"
                                                                    rows="4"
                                                                    type="text"
                                                                    placeholder="Enter description"
                                                                    name={`features[${index}][desc]`}
                                                                    value={ind.desc || ''}
                                                                    onChange={(e) => handleArrayChange('features', [...states.features.slice(0, index), { ...ind, desc: e.target.value }, ...states.features.slice(index + 1)])} // Use handleArrayChange
                                                                />
                                                                <SingleError error={errors.features?.[index]?.desc} />
                                                            </div>
                                                            <div className="d-flex justify-content-end mt-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFeature(index)} // Ensure `ind.id` is valid
                                                                    className="btn btn-danger py-2"
                                                                >
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row> */}

                                        {/* <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Sample Screens:</h5>
                                                </div>
                                            </Col>
                                            <Col md={12} className='mb-3'>
                                                <div>
                                                    <MultipleImageUpload
                                                        label="Image:"
                                                        name={`sample_screen_images`}
                                                        setStates={setStates}
                                                        states={states}
                                                    />
                                                </div>
                                                <div className='d-flex align-items-start gap-3 w-100' >
                                                    {Array.from(states?.sample_screen_images)?.map((image, index) => (
                                                        <div className="image-preview-container" key={index}>
                                                            <div key={index} className="image-preview">
                                                                <img
                                                                    src={image?.image?.name ? URL.createObjectURL(image?.image) : `${imageURL}${image.image}`}
                                                                    alt={`preview ${index}`}
                                                                    className="preview-image sample-screens-image"
                                                                />
                                                                <button
                                                                    onClick={(e) => handleRemoveImage(e, index, 'sample_screen_images')}
                                                                    className="remove-button"
                                                                >
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row> */}

                                        {/* <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Other Screens:</h5>
                                                </div>
                                            </Col>
                                            <Col md={12} className='mb-3'>
                                                <div>
                                                    <MultipleImageUpload
                                                        label="Image:"
                                                        name={`other_images`}
                                                        setStates={setStates}
                                                        states={states}
                                                    />
                                                </div>
                                                <div className='d-flex align-items-start gap-3 w-100'>
                                                    {Array.from(states?.other_images)?.map((image, index) => (
                                                        <div className="image-preview-container" key={index}>
                                                            <div key={index} className="image-preview">
                                                                <img
                                                                    src={image?.image?.name ? URL.createObjectURL(image?.image) : `${imageURL}${image.image}`}
                                                                    alt={`preview ${index}`}
                                                                    className="preview-image sample-screens-image"
                                                                />
                                                                <button
                                                                    onClick={(e) => handleRemoveImage(e, index, 'other_images')}
                                                                    className="remove-button"
                                                                >
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row> */}

                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h5 className='form-title'>Detail</h5>
                                            <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddDetails}>
                                                <PiPlusBold />
                                            </div>
                                        </div>
                                        <Row className='g-3'>
                                            {states?.details?.map((ind, index) => (
                                                // <Col md={12} className='mb-4' key={ind.id}>
                                                <Fragment key={index + "details"}>
                                                    <Col xl={6}>
                                                        <LableInput
                                                            required={true}
                                                            label="Key"
                                                            className="form-control"
                                                            id={`details[${index}][key]`}
                                                            placeholder="Enter key name"
                                                            type="text"
                                                            name={`details[${index}][key]`}
                                                            value={ind.key || ''}
                                                            onChange={(e) => handleArrayChange('details', [...states.details.slice(0, index), { ...ind, key: e.target.value }, ...states.details.slice(index + 1)])}
                                                        />
                                                        {errors?.details?.[index]?.key && <SingleError error={errors?.details?.[index]?.key} />}
                                                    </Col>
                                                    <Col xl={6}>
                                                        <div className='d-flex align-items-end gap-2 w-100'>
                                                            <div className='w-100'>
                                                                <label htmlFor="signin-username" className="form-label text-default" id={`details[${index}][value]`}>Value<span className="star">*</span></label>
                                                                <div className='label-none'>
                                                                    <LableInput
                                                                        required={true}
                                                                        label="Value"
                                                                        className="form-control"
                                                                        id={`details[${index}][value]`}
                                                                        placeholder="Enter key value"
                                                                        type="text"
                                                                        name={`details[${index}][value]`}
                                                                        value={ind.value || ''}
                                                                        onChange={(e) => handleArrayChange('details', [...states.details.slice(0, index), { ...ind, value: e.target.value }, ...states.details.slice(index + 1)])}
                                                                    />
                                                                    {errors?.details?.[index]?.value && <SingleError error={errors?.details?.[index]?.value} />}
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveDetails(index)}
                                                                className="btn btn-danger py-2"
                                                            >
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Fragment>
                                            ))}
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Solution</h5>
                                                    {/* <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddSolutions}>
                                                        <PiPlusBold />
                                                    </div> */}
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='w-100'>
                                                    <LableInput
                                                        required={true}
                                                        label="Main Title"
                                                        className="form-control"
                                                        id={`solution_main_title`}
                                                        placeholder="Enter main title"
                                                        type="text"
                                                        name={`solution_main_title`}
                                                        value={states?.solution_main_title || ''}
                                                        onChange={handleChange}
                                                    // onChange={(e) => handleArrayChange('faqs', [...states.faqs.slice(0, index), { ...ind, question: e.target.value }, ...states.faqs.slice(index + 1)])} // Use handleArrayChange
                                                    />
                                                    <SingleError error={errors.solution_main_title} />
                                                </div>
                                                <hr className='mt-4' />
                                            </Col>
                                            {/* <div className='d-flex justify-content-between align-items-center'>
                                                <h5 className='form-title'>{""}</h5>
                                                <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddSolutions}>
                                                    <PiPlusBold />
                                                </div>
                                            </div> */}

                                            {states?.solution?.map((ind, index) => (
                                                <Col md={12} key={"solution" + index}>
                                                    <div className='d-flex align-items-end gap-2'>
                                                        <div className='w-100'>
                                                            <label htmlFor="signin-username" className="form-label text-default" id={`solution[${index}][title]`}>Title<span className="star">*</span></label>
                                                            <div className="label-none">
                                                                <LableInput
                                                                    required={true}
                                                                    label="Title"
                                                                    className="form-control"
                                                                    id={`solution[${index}][title]`}
                                                                    placeholder="Enter question"
                                                                    type="text"
                                                                    name={`solution[${index}][title]`}
                                                                    value={ind.title || ''}
                                                                    onChange={(e) => handleArrayChange('solution', [...states.solution.slice(0, index), { ...ind, title: e.target.value }, ...states.solution.slice(index + 1)])} // Use handleArrayChange
                                                                />
                                                                <SingleError error={errors.solution?.[index]?.title} />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSolutions(index)}
                                                            className="btn btn-danger py-2"
                                                        >
                                                            <RiDeleteBinLine />
                                                        </button>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <Textarea
                                                            required={true}
                                                            label="Description"
                                                            rows="4"
                                                            type="text"
                                                            id={`solution[${index}][desc]`}
                                                            name={`solution[${index}][desc]`}
                                                            value={ind.desc || ''}
                                                            onChange={(e) => handleArrayChange('solution', [...states.solution.slice(0, index), { ...ind, desc: e.target.value }, ...states.solution.slice(index + 1)])} // Use handleArrayChange
                                                        />
                                                        <SingleError error={errors.solution?.[index]?.desc} />
                                                    </div>
                                                </Col>
                                            ))}

                                            <div className='d-flex justify-content-between align-items-center'>
                                                <h5 className='form-title'>{""}</h5>
                                                <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddSolutions}>
                                                    <PiPlusBold />
                                                </div>
                                            </div>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Process</h5>
                                                    {/* <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddProcess}>
                                                        <PiPlusBold />
                                                    </div> */}
                                                </div>
                                            </Col>
                                            {states?.process?.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={index + "process"}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileInputComman
                                                                label="Image"
                                                                id={`process[${index}][image]`}
                                                                setImage={handleImageChange('process', index)}
                                                                initialImage={ind.image || ''}
                                                                name={`process[${index}][image]`}
                                                            />
                                                            <SingleError error={errors.process?.[index]?.image} />
                                                            {/* <SingleError error={errors.content?.[index]?.image} /> */}
                                                        </div>
                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <Row className='g-3'>
                                                                <Col xl={12}>
                                                                    <LableInput
                                                                        label="Title"
                                                                        className="form-control"
                                                                        id={`process[${index}][title]`}
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`process[${index}][title]`}
                                                                        value={ind.title || ''}
                                                                        onChange={(e) => handleArrayChange('process', [...states.process.slice(0, index), { ...ind, title: e.target.value }, ...states.process.slice(index + 1)])} // Use handleArrayChange
                                                                    />
                                                                    <SingleError error={errors.process?.[index]?.title} />
                                                                </Col>

                                                            </Row>

                                                            {/* {index > 0 && ( */}
                                                            <div className="d-flex justify-content-end mt-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveProcess(index)}
                                                                    className="btn btn-danger py-2"
                                                                >
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                            {/* )} */}
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <h5 className='form-title'>{""}</h5>
                                                <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddProcess}>
                                                    <PiPlusBold />
                                                </div>
                                            </div>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 g-3">
                                            <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5 className="form-title">Technology</h5>
                                                    {/* Add Technology Button */}
                                                    {/* <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddTechnology}>
                                                        <PiPlusBold />
                                                    </div> */}
                                                </div>
                                            </Col>

                                            {/* Title Input */}
                                            <div className="w-100">
                                                <LableInput
                                                    label="Main Title"
                                                    className="form-control"
                                                    id="technologyMainTitle"
                                                    placeholder="Enter technology main title"
                                                    type="text"
                                                    name="technologyMainTitle"
                                                    value={states.technology.title || ''}
                                                    onChange={handleTitleChange}
                                                />
                                            </div>

                                            <Col md={12}>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <label
                                                        htmlFor="signin-username"
                                                        className="form-label text-default mb-0 form-title"
                                                    >
                                                        Technology Name
                                                    </label>
                                                    {/* Add Technology Button */}
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddTechnology}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>

                                            {/* Technology Names */}
                                            {states?.technology?.tech.map((tech, index) => (
                                                <Col xl={4} key={index + "tech"} className="mb-3">
                                                    <div className='d-flex align-items-center gap-1'>
                                                        <input
                                                            className="form-control"
                                                            id={`text-${index}`}
                                                            placeholder="Enter technology name"
                                                            type="text"
                                                            name={`text-${index}`}
                                                            value={tech}
                                                            onChange={(e) => handleArrayChange1(index, e.target.value)} // Update tech array at the specified index
                                                        />
                                                        <SingleError error={null /* Add your error handling here */} />
                                                        {states.technology.tech.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveTechnology(index)}
                                                                className="btn btn-danger py-2"
                                                            >
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        )}
                                                    </div>
                                                </Col>
                                            ))
                                            }
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row >

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Content</h5>
                                                    {/* <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddContent}>
                                                        <PiPlusBold />
                                                    </div> */}
                                                </div>
                                            </Col>
                                            {states?.content?.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={index + "content"}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div className='team_images'>
                                                            <FileInputComman
                                                                label="Image"
                                                                setImage={handleImageChange('content', index)}
                                                                initialImage={ind.image || ''}
                                                                name={`content[${index}][image]`}
                                                                id={`content[${index}][image]`}
                                                            />
                                                            <SingleError error={errors.content?.[index]?.image} />
                                                        </div>
                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <Row className='g-3'>
                                                                <Col xl={12}>
                                                                    <div className='d-flex align-items-end gap-2'>
                                                                        <div className='w-100'>

                                                                            {/* <label htmlFor="signin-username" className="form-label text-default" id={`text-${index}`}>Title<span className="star">*</span></label> */}
                                                                            <div className='label-none'>
                                                                                <LableInput
                                                                                    required={false}
                                                                                    label="Title"
                                                                                    className="form-control"
                                                                                    id={`content[${index}][title]`}
                                                                                    placeholder="Enter title"
                                                                                    type="text"
                                                                                    name={`content[${index}][title]`}
                                                                                    value={ind.title || ''}
                                                                                    onChange={(e) => handleArrayChange('content', [...states.content.slice(0, index), { ...ind, title: e.target.value }, ...states.content.slice(index + 1)])} // Use handleArrayChange
                                                                                />
                                                                                <SingleError error={errors.content?.[index]?.title} />
                                                                            </div>
                                                                        </div>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleRemoveContent(index)}
                                                                            className="btn btn-danger py-2"
                                                                        >
                                                                            <RiDeleteBinLine />
                                                                        </button>
                                                                    </div>
                                                                </Col>
                                                                {/* <Col xl={6}>
                                                                    <LableInput
                                                                        label="Redirect Link:"
                                                                        className="form-control"
                                                                        id={`text-${index}`} // Unique id for each input
                                                                        placeholder="Enter redirect link"
                                                                        type="text"
                                                                        name={`content[${index}][redirect_link]`} // Use indexed name for formData
                                                                        value={ind.redirect_link || ''} // Set value from state
                                                                        onChange={(e) => handleArrayChange('content', [...states.content.slice(0, index), { ...ind, redirect_link: e.target.value }, ...states.content.slice(index + 1)])} // Use handleArrayChange
                                                                    />
                                                                    <SingleError error={errors.content?.[index]?.redirect_link} />
                                                                </Col> */}
                                                            </Row>
                                                            <div className='mt-3'>
                                                                <Textarea
                                                                    label="Description"
                                                                    rows="4"
                                                                    type="text"
                                                                    name={`content[${index}][desc]`} // Use indexed name for formData
                                                                    value={ind.desc || ''} // Set value from state
                                                                    onChange={(e) => handleArrayChange('content', [...states.content.slice(0, index), { ...ind, desc: e.target.value }, ...states.content.slice(index + 1)])} // Use handleArrayChange
                                                                />
                                                                <SingleError error={errors.content?.[index]?.desc} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <h5 className='form-title'>{""}</h5>
                                                <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddContent}>
                                                    <PiPlusBold />
                                                </div>
                                            </div>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='g-3 mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Client Feedback</h5>
                                                </div>
                                            </Col>

                                            <Col md={12} className='mb-3'>
                                                <div className='d-md-flex align-items-start gap-3 w-100'>
                                                    <div className='team_images'>
                                                        <FileInputComman
                                                            required={true}
                                                            label="Image"
                                                            initialImage={states.client?.image || ''}
                                                            id="client_image"
                                                            name="image"
                                                            setImage={handleImageChange1}
                                                            onChange={handleClientChange} // Pass handleChange to the FileInput component
                                                        />
                                                        <SingleError error={errors.client?.image} />
                                                    </div>

                                                    <div className='w-100 mt-3 mt-md-0'>
                                                        <div className='d-flex align-items-end gap-2'>
                                                            <div className='w-100'>
                                                                <LableInput
                                                                    required={true}
                                                                    label="Name"
                                                                    className="form-control"
                                                                    id={`client.[name]`}
                                                                    placeholder="Enter name"
                                                                    type="text"
                                                                    name="name"
                                                                    value={states?.client?.name || ''}
                                                                    onChange={handleClientChange} // Attach handleChange here
                                                                />
                                                                <SingleError error={errors.client?.name} />
                                                            </div>
                                                            <div className='w-100'>
                                                                <LableInput
                                                                    required={true}
                                                                    label="Designation"
                                                                    className="form-control"
                                                                    id={`client.[designation]`}
                                                                    placeholder="Enter designation"
                                                                    type="text"
                                                                    name="designation"
                                                                    value={states.client?.designation || ''}
                                                                    onChange={handleClientChange} // Attach handleChange here
                                                                />
                                                                <SingleError error={errors.client?.designation} />
                                                            </div>
                                                        </div>

                                                        <div className='mt-3'>
                                                            <Textarea
                                                                required={true}
                                                                label="Feedback"
                                                                rows="4"
                                                                type="text"
                                                                placeholder="Enter feedback"
                                                                name="feedback"
                                                                value={states.client?.feedback || ''}
                                                                onChange={handleClientChange} // Attach handleChange here
                                                            />
                                                            <SingleError error={errors.client?.feedback} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        {/* <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Faqs:</h5>
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddFaqs}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>
                                            {states.faqs.map((ind, index) => (
                                                <Col md={12} className='mb-4' key={ind.id}>
                                                    <div className='d-flex align-items-end gap-2'>
                                                        <div className='w-100'>
                                                            <LableInput
                                                                label="Question:"
                                                                className="form-control"
                                                                id={`text-${index}`}
                                                                placeholder="Enter question"
                                                                type="text"
                                                                name={`faqs[${index}][question]`}
                                                                value={ind.question || ''}
                                                                onChange={(e) => handleArrayChange('faqs', [...states.faqs.slice(0, index), { ...ind, question: e.target.value }, ...states.faqs.slice(index + 1)])} // Use handleArrayChange
                                                            />
                                                            <SingleError error={errors.faqs?.[index]?.question} />
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <Textarea
                                                            label="Answer:"
                                                            rows="4"
                                                            type="text"
                                                            name={`faqs[${index}][answer]`}
                                                            value={ind.answer || ''}
                                                            onChange={(e) => handleArrayChange('faqs', [...states.faqs.slice(0, index), { ...ind, answer: e.target.value }, ...states.faqs.slice(index + 1)])} // Use handleArrayChange
                                                        />
                                                        <SingleError error={errors.faqs?.[index]?.answer} />
                                                    </div>
                                                    <div className="d-flex justify-content-end mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFaqs(index)}
                                                            className="btn btn-danger py-2"
                                                        >
                                                            <RiDeleteBinLine />
                                                        </button>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row> */}
                                    </form >

                                    <div className="d-md-flex justify-content-between align-items-center mt-3">
                                        <div className='d-flex align-items-center gap-2'>
                                            <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                Status:
                                            </label>
                                            <Switch mode={state.status} onToggle={handleToggle} index={0} />
                                        </div>
                                        <div className='d-flex justify-content-end gap-2 mt-3 mt-md-0'>
                                            <CommanButton className="save-btn" text="Save" handleSubmit={addCases} />
                                            <CommanButton className="cancel-btn" text="Cancel" handleSubmit={closeFaq} />
                                        </div>
                                    </div>
                                </Card.Body >
                            </Card >
                        </Col >

                    </Row >
                </div >
            </Layout >
        </>
    )
}

export default AddCaseStudiesIndex
