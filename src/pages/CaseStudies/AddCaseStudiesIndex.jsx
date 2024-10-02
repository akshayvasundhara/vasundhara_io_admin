
import React, { useEffect, useState } from 'react'
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
    "play_store_link",
    "app_store_link",
    "author",
    "faqs",
    "features",
    "industry",
    "content",
];

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
        author: '',
        status: '',
        play_store_link: '',
        app_store_link: '',
        desc: '',
        tags: [''],
        industry: [{ title: '', desc: '', image: null }],
        features: [{ title: '', desc: '', image: null }],
        content: [{ title: '', desc: '', image: null, redirect_link: '' }],
        faqs: [{ question: '', answer: '' }],
        sample_images: [{ image: null }],
        other_image: [{ image: null }],
    });

    // Function to handle the toggle switch
    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
    };

    // Close FAQ
    const closeFaq = async (e) => {
        setStates({});
        navigate('/faqs');
    }


    // Get State 
    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setStates({
                title: state.title,
                sub_title: state.sub_title,
                author: state.author._id,
                status: state.status,
                play_store_link: state.play_store_link,
                app_store_link: state.app_store_link,
                desc: state.desc,
                tags: state.tags || [''],
                industry: state.industry || [''],
                features: state.features || [''],
                content: state.content || [''],
                faqs: state.faqs || ['']
            });
            if (state.image) {
                const fullImageUrl = `${imageURL}${state.image}`;
                setImage(fullImageUrl);
            } else {
                setImage(null); // Clear image if there's no valid image
            }

            if (state.video) {
                const fullVideoUrl = `${imageURL}${state.video}`;
                setVideo(fullVideoUrl);
            } else {
                setVideo(null); // Clear video if there's no valid video
            }
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



    const handleAddIndustry = () => {
        setStates((prevStates) => ({
            ...prevStates,
            industry: [...prevStates.industry, { title: '', desc: '', image: '' }], // Add a new empty tag field
        }));
    };

    const handleAddFeature = () => {
        setStates((prevStates) => ({
            ...prevStates,
            features: [...prevStates.features, { title: '', desc: '', image: '' }], // Add a new empty tag field
        }));
    };

    const handleAddContent = () => {
        setStates((prevStates) => ({
            ...prevStates,
            content: [...prevStates.content, { title: '', desc: '', image: '', redirect_link: '' }], // Add a new empty tag field
        }));
    };

    const handleAddFaqs = () => {
        setStates((prevStates) => ({
            ...prevStates,
            faqs: [...prevStates.faqs, { question: '', answer: '' }], // Add a new empty tag field
        }));
    };


    const handleRemoveIndustry = (index) => {
        // setIndustry(industry.filter(ind => ind.id !== id)); // Remove the industry by ID
        setStates((prevStates) => ({
            ...prevStates,
            industry: prevStates.industry.filter((_, i) => i !== index), // Remove the tag at the specified index
        }));
    };

    const handleRemoveFeature = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            features: prevStates.features.filter((_, i) => i !== index), // Remove the tag at the specified index
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



    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;


        if (submitCount > 0) {
            let validationErrors = BlogValidates({ ...states, [name]: value, image: newValue, video: newValue });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
                delete errors.image;
                delete errors.video
            }
        }
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    }


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
        e.preventDefault(); // Prevent default form submission
        setSubmitCount(prevCount => prevCount + 1);

        const updatedValues = { ...states, image, video, status };

        let validationErrors = BlogValidates(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);

        if (image) {
            delete validationErrors.image;
        }
        setErrors(validationErrors);

        if (isValidationErrorsEmpty(validationErrors)) { // Adjust this condition based on your validation requirements
            try {
                const formData = new FormData(); // Create FormData for file upload

                // Append top-level fields
                formData.append('title', updatedValues.title);
                formData.append('sub_title', updatedValues.sub_title);
                formData.append('author', updatedValues.author ? updatedValues.author : teamOptions[0].value);
                formData.append('play_store_link', updatedValues.play_store_link);
                formData.append('app_store_link', updatedValues.app_store_link);
                formData.append('desc', updatedValues.desc);
                formData.append('status', status);
                formData.append('image', image);
                formData.append('video', video);


                // Append tags
                updatedValues.tags.forEach((tag, index) => {
                    formData.append(`tags[${index}]`, tag);
                });

                // Append FAQs
                updatedValues.faqs.forEach((faq, index) => {
                    formData.append(`faqs[${index}][question]`, faq.question);
                    formData.append(`faqs[${index}][answer]`, faq.answer);
                });

                // Append features
                updatedValues.features.forEach((feature, index) => {
                    formData.append(`features[${index}][title]`, feature.title);
                    formData.append(`features[${index}][desc]`, feature.desc);
                    if (feature.image) {
                        formData.append(`features[${index}][image]`, feature.image.name);
                        formData.append('feature_image', feature.image) // Ensure cont.image is valid
                    }
                });

                // Append industry
                updatedValues.industry.forEach((ind, index) => {
                    formData.append(`industry[${index}][title]`, ind.title);
                    formData.append(`industry[${index}][desc]`, ind.desc);
                    if (ind.image) {
                        formData.append(`industry[${index}][image]`, ind.image.name);
                        formData.append('industry_image', ind.image) // Ensure cont.image is valid
                    }
                });

                // Append content
                updatedValues.content.forEach((cont, index) => {
                    formData.append(`content[${index}][title]`, cont.title);
                    formData.append(`content[${index}][desc]`, cont.desc);
                    formData.append(`content[${index}][redirect_link]`, cont.redirect_link);
                    if (cont.image) {
                        formData.append(`content[${index}][image]`, cont.image.name);
                        formData.append('content_image', cont.image) // Ensure cont.image is valid
                    }
                });
                updatedValues.sample_images.forEach((samp, index) => {
                    if (samp.image) {
                        formData.append('sample_image', samp.image);
                        formData.append(`sample_screen_images[${index}][image]`, samp.image.name);
                    }
                })

                updatedValues.other_image.forEach((oth, index) => {
                    console.log(oth.image);
                    if (oth.image) {
                        formData.append('other_image', oth.image);
                        formData.append(`other_screen_images[${index}][image]`, oth.image.name);
                    }
                })

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

    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/case-studies' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>{location.pathname === '/case-studies-add' ? 'Add Case Studies' : 'Edit Case Studies'} </h2>
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
                                                    label="Title:"
                                                    className="form-control"
                                                    id="text"
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
                                                    label="Subtitle:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter subtitle"
                                                    type="text"
                                                    name='sub_title'
                                                    value={states?.sub_title || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.sub_title} />
                                            </Col>
                                            <Col md={12}>

                                                <SelectInput label="Author:" options={teamOptions} name="author"  // Add name here
                                                    value={states.author}  // Bind to the state
                                                    onChange={handleChange} />

                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="Google Play Store:"
                                                    className="form-control"
                                                    id="text"
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
                                                    label="App Store:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter app store link"
                                                    type="text"
                                                    name='app_store_link'
                                                    value={states?.app_store_link || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.app_store_link} />
                                            </Col>
                                            <Col md={12}>
                                                <Textarea label="Description:" rows="4" type="text" name="desc" value={states.desc || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.desc} />
                                            </Col>

                                            <Col md={12}>
                                                <div className='d-xl-flex align-items-start gap-3'>
                                                    <div className='d-md-flex align-items-start gap-3'>
                                                        <div>
                                                            <FileInput label="Banner:" setImage={setImage} initialImage={image} onChange={handleChange} />
                                                            <SingleError error={errors?.image} />
                                                        </div>
                                                        <div className='mt-3 mt-md-0'>
                                                            <VideoUpload
                                                                label="Video:"
                                                                setVideo={setVideo}
                                                                initialVideo={video}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Row className='w-100 mt-3 mt-xl-0 g-0'>
                                                        <PlushLableInput
                                                            label="Tags:"
                                                            className="form-control"
                                                            id="text"
                                                            placeholder="Enter location"
                                                            type="text"
                                                            name='tags'
                                                            value={states?.tags || ""}
                                                            // onKeyPress={handleKeyPress}
                                                            onChange={(newValues) => handleArrayChange('tags', newValues)}
                                                        />
                                                        <SingleError error={errors?.tags} />
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Industry</h5>
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
                                                                setImage={handleImageChange('industry', index)} // Update the image for the specific index
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
                                                                        id={`industry-title-${index}`} // Unique id for each input
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`industry[${index}][title]`} // Use indexed name for formData
                                                                        value={ind.title || ''} // Set value from state
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
                                                                    name={`industry[${index}][desc]`} // Use indexed name for formData
                                                                    value={ind.desc || ''} // Set value from state
                                                                    onChange={(e) => handleArrayChange('industry', [...states.industry.slice(0, index), { ...ind, desc: e.target.value }, ...states.industry.slice(index + 1)])} // Use handleArrayChange
                                                                />
                                                                <SingleError error={errors.industry?.[index]?.desc} />
                                                            </div>

                                                            {index > 0 && (
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveIndustry(index)} // Ensure `ind.id` is valid
                                                                        className="btn btn-danger py-2"
                                                                    >
                                                                        <RiDeleteBinLine />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}

                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>


                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Features</h5>
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
                                                                setImage={handleImageChange('features', index)} // Update the image for the specific index
                                                                initialImage={ind.image || ''}
                                                                name={`features[${index}][image]`}
                                                            />
                                                            <SingleError error={errors.features?.[index]?.image} />{/* Adjusted error handling */}
                                                        </div>

                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <div className='d-flex align-items-end gap-2'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        label="Title:"
                                                                        className="form-control"
                                                                        id={`industry-title-${index}`} // Unique id for each input
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`features[${index}][title]`} // Use indexed name for formData
                                                                        value={ind.title || ''} // Set value from state
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
                                                                    name={`features[${index}][desc]`} // Use indexed name for formData
                                                                    value={ind.desc || ''} // Set value from state
                                                                    onChange={(e) => handleArrayChange('features', [...states.features.slice(0, index), { ...ind, desc: e.target.value }, ...states.features.slice(index + 1)])} // Use handleArrayChange
                                                                />
                                                                <SingleError error={errors.features?.[index]?.desc} />
                                                            </div>

                                                            {index > 0 && (
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveFeature(index)} // Ensure `ind.id` is valid
                                                                        className="btn btn-danger py-2"
                                                                    >
                                                                        <RiDeleteBinLine />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Sample Screens</h5>
                                                </div>
                                            </Col>
                                            <Col md={12} className='mb-3'>
                                                {states?.sample_images?.map((sampleImage, index) => (
                                                    <div className='d-flex align-items-start gap-3 w-100' key={index}>
                                                        <div>
                                                            <MultipleImageUpload
                                                                label="Image:"
                                                                setSampled={(newImages) => handleImageChange('sample_images', index, newImages)} // Pass the new images to your handler
                                                                initialImage={sampleImage.image ? [sampleImage.image] : []} // Set the initial image if it exists
                                                                name={`sample_images[${index}][image]`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </Col>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Other Image</h5>
                                                </div>
                                            </Col>
                                            {/* <Col md={12}>
                                                <div className='d-flex align-items-start gap-3 w-100'>
                                                    <div>
                                                        <MultipleImageUpload label="Image:" setSampled={setOtherImage} initialImage={otherImage} />
                                                    </div>
                                                </div>
                                            </Col> */}
                                            <Col md={12} className='mb-3'>
                                                {states?.other_image?.map((otherImage, index) => (
                                                    <div className='d-flex align-items-start gap-3 w-100' key={index}>
                                                        <div>
                                                            <MultipleImageUpload
                                                                label="Image:"
                                                                setSampled={(newImages) => handleImageChange('other_image', index, newImages)} // Pass the new images to your handler
                                                                initialImage={otherImage.image ? [otherImage.image] : []} // Set the initial image if it exists
                                                                name={`other_image[${index}][image]`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </Col>
                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Content</h5>
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddContent}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>
                                            {states.content.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={ind.id}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileInputComman
                                                                label="Image:"
                                                                setImage={handleImageChange('content', index)} // Update the image for the specific index
                                                                initialImage={ind.image || ''}
                                                                name={`content[${index}][image]`}
                                                            />
                                                            <SingleError error={errors.content?.[index]?.image} />
                                                        </div>
                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <Row className='g-3'>
                                                                <Col xl={6}>
                                                                    <LableInput
                                                                        label="Title:"
                                                                        className="form-control"
                                                                        id={`text-${index}`} // Unique id for each input
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`content[${index}][title]`} // Use indexed name for formData
                                                                        value={ind.title || ''} // Set value from state
                                                                        onChange={(e) => handleArrayChange('content', [...states.content.slice(0, index), { ...ind, title: e.target.value }, ...states.content.slice(index + 1)])} // Use handleArrayChange
                                                                    />
                                                                    <SingleError error={errors.content?.[index]?.title} />
                                                                </Col>
                                                                <Col xl={6}>
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
                                                                </Col>
                                                            </Row>
                                                            <div className='mt-3'>
                                                                <Textarea
                                                                    label="Description:"
                                                                    rows="4"
                                                                    type="text"
                                                                    name={`content[${index}][desc]`} // Use indexed name for formData
                                                                    value={ind.desc || ''} // Set value from state
                                                                    onChange={(e) => handleArrayChange('content', [...states.content.slice(0, index), { ...ind, desc: e.target.value }, ...states.content.slice(index + 1)])} // Use handleArrayChange
                                                                />
                                                                <SingleError error={errors.content?.[index]?.desc} />
                                                            </div>
                                                            {index > 0 && (
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveContent(index)}
                                                                        className="btn btn-danger py-2"
                                                                    >
                                                                        <RiDeleteBinLine />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>

                                            ))}


                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Faqs</h5>
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
                                                                id={`text-${index}`} // Unique id for each input
                                                                placeholder="Enter question"
                                                                type="text"

                                                                name={`faqs[${index}][question]`} // Use indexed name for formData
                                                                value={ind.question || ''} // Set value from state
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
                                                            name={`faqs[${index}][answer]`} // Use indexed name for formData
                                                            value={ind.answer || ''} // Set value from state
                                                            onChange={(e) => handleArrayChange('faqs', [...states.faqs.slice(0, index), { ...ind, answer: e.target.value }, ...states.faqs.slice(index + 1)])} // Use handleArrayChange
                                                        />
                                                        <SingleError error={errors.faqs?.[index]?.answer} />
                                                    </div>
                                                    {index > 0 && (
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveFaqs(index)}
                                                                className="btn btn-danger py-2"
                                                            >
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </div>
                                                    )}
                                                </Col>

                                            ))}
                                        </Row>

                                    </form>

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
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </Layout >
        </>
    )
}

export default AddCaseStudiesIndex
