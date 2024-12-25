
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ImArrowLeft } from "react-icons/im";
import { PiPlusBold } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../API/api';
import CommanButton from '../../components/comman/CommanButton';
import FileICon from '../../components/comman/FileIcon';
import FileInput from '../../components/comman/FileInput';
import FileVideo from '../../components/comman/FileVideo';
import FileInputComman from '../../components/comman/FileInputComman';
import LableInput from '../../components/comman/LableInput';
import LinkButton from '../../components/comman/LinkButton';
import LoaderComman from '../../components/comman/LoaderComman';
import MultipleImageUpload from '../../components/comman/MultipleInageUpload';
import SelectInput from '../../components/comman/SelectInput';
import Switch from '../../components/comman/Switch';
import Textarea from '../../components/comman/Textarea';
import { PortFolioValidate } from '../../components/validate/portFolioValidate';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import { errorResponse } from '../../helper/error';
import ErrorFilter from '../../helper/errorFilter';
import SingleError from '../../helper/SingleError';
import Layout from '../../layout/Layout';
import FileImageVideo from '../../components/comman/FileImageVideo';
import { type } from '@testing-library/user-event/dist/type';

const requireField = [
    "title",
    "desc",
    "category",
    "image",
];

function IndexPortfolioEdit() {
    const location = useLocation();
    const state = location.state || {};
    const navigate = useNavigate();
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [mainLoader, setMainLoader] = useState(false);
    const [options, setOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitCount, setSubmitCount] = useState(0);
    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);
    const [video, setVideo] = useState(null);
    // const [status, setStatus] = useState(state.status || 1)
    const [status, setStatus] = useState(state.status !== undefined ? state.status : 1);
    const [states, setStates] = useState({
        title: '',
        status: '',
        play_store_link: '',
        app_store_link: '',
        desc: '',
        features: [{ title: '', image: null }],
        faqs: [{ question: '', answer: '' }],
        sample_screen_images: [],
        // reviews: '',
        // downloads: '',
        // rating: 0
    });

    // Function to handle the toggle switch
    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
        setStates(prevStates => ({ ...prevStates, status: prevStates.status === 0 ? 1 : 0 }));
    };

    // Close PortFOlio
    const closeFaq = async (e) => {
        setStates({});
        navigate('/portfolio');
    }

    // Get State 
    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setStates({
                title: state?.title,
                category: state?.category?._id,
                status: state?.status,
                play_store_link: state?.play_store_link,
                app_store_link: state?.app_store_link,
                website_link: state?.website_link,
                desc: state?.desc,
                features: state?.features || [''],
                rating: state?.rating,
                reviews: state?.reviews,
                downloads: state?.downloads,
                image: state?.image || null,
                video: state?.video || null,
                icon: state?.icon || null
            });
            if (state?.image) {
                setImage(state?.image);
            }
            if (state?.video !== null && state?.video !== undefined) {
                setVideo(state?.video);
            }
            if (state?.icon !== null && state?.icon !== undefined) {
                setIcon(state?.icon);
            }
            if (state.features && Array.isArray(state.features)) {
                const updatedFeatures = state.features.map(feat => ({
                    ...feat,
                    image: feat.image ? feat.image : null
                }));
                setStates(prev => ({ ...prev, features: updatedFeatures }));
            }
            if (state.sample_screen_images && Array.isArray(state.sample_screen_images)) {
                const updatedSample = state.sample_screen_images.map(samp => ({
                    ...samp,
                    // image: samp.image ? `${imageURL}${samp.image}` : null
                    image: samp.image ? samp.image : null
                }))
                setStates(prev => ({ ...prev, sample_screen_images: updatedSample }));
            }
        }
    }, [state, options]);

    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        if (submitCount > 0) {
            let validationErrors = PortFolioValidate({ ...states, [name]: value });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
                //     if (image) {
                //         delete errors.image;
                //     }
                //     if (icon) {
                //         delete errors.icon;
                //     }
                if (name === "image") {
                    if (!newValue) {
                        validationErrors.image = "Please upload an image";
                    } else {
                        delete validationErrors.image;
                    }
                } else if (name === "icon") {
                    if (!newValue) {
                        validationErrors.icon = "Please upload an icon";
                    } else {
                        delete validationErrors.icon;
                    }
                }
            }

        }
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    }

    // Handle array change for location, res, skill
    const handleArrayChange = (name, newValues) => {
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValues,
        }));

        if (submitCount > 0) {
            const updatedValues = { ...states, [name]: newValues };
            let validationErrors = PortFolioValidate(updatedValues);
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

    // Get category
    const getOptions = async () => {
        try {
            const response = await api.getWithToken(`${serverURL}/blog-category?type=portfolio&status=1`)
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

    const handleAddFeature = () => {
        setStates((prevStates) => ({
            ...prevStates,
            features: [...prevStates.features, { title: '', image: '' }],
        }));
    };

    const addCases = async (e) => {
        e.preventDefault();
        setSubmitCount(prevCount => prevCount + 1);
        const updatedValues = { ...states };

        let validationErrors = PortFolioValidate(updatedValues);

        validationErrors = ErrorFilter(validationErrors, requireField);

        if (image) {
            delete errors.image;
        }
        // if (icon) {
        //     delete errors.icon;
        // }
        setErrors(validationErrors);

        if (Object.keys(validationErrors)?.length) {
            Object.entries(validationErrors)?.map(([key], i) => {
                if (i == 0)
                    document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
            });
        }

        if (isValidationErrorsEmpty(validationErrors)) {
            try {
                const formData = new FormData();
                // Append top-level fields
                formData.append('title', updatedValues.title);
                formData.append('category', updatedValues.category ? updatedValues.category : teamOptions[0].value);
                if (updatedValues.rating) {
                    formData.append('rating', updatedValues.rating);
                }
                if (updatedValues.downloads) {

                    formData.append('downloads', updatedValues.downloads);
                }
                if (updatedValues.reviews) {
                    formData.append('reviews', updatedValues.reviews);
                }
                // if (updatedValues.website_link) {
                formData.append('website_link', updatedValues.website_link || '');
                // }
                // Append play_store_link if not empty
                // if (updatedValues.play_store_link) {
                formData.append('play_store_link', updatedValues.play_store_link || '');
                // }

                // Append app_store_link if not empty
                // if (updatedValues.app_store_link) {
                formData.append('app_store_link', updatedValues.app_store_link || '');
                // }
                if (updatedValues.desc) {
                    formData.append('desc', updatedValues.desc);
                }
                formData.append('status', status);
                formData.append('image', image);
                formData.append('icon', icon);
                formData.append('video', video);

                // Append features if not empty
                if (Array.isArray(updatedValues.features)) {
                    updatedValues.features.forEach((feature, index) => {
                        if (feature.title) {
                            formData.append(`features[${index}][title]`, feature.title);
                        }
                        if (state._id) {
                            if (feature.image && feature.image.name) {
                                formData.append(`features[${index}][image]`, feature.image.name);
                                formData.append('feature_image', feature.image || '');
                            } else {
                                formData.append(`features[${index}][_id]`, feature._id);
                                formData.append(`features[${index}][image]`, feature.image || '');
                                if (feature.image.name) {
                                    formData.append('feature_image', feature.image || '');
                                }
                            }
                        } else {
                            formData.append(`features[${index}][image]`, feature.image ? feature.image.name : '');
                            formData.append('feature_image', feature.image || '');
                        }
                        // }
                    });
                }

                if (Array.isArray(updatedValues.sample_screen_images)) {
                    updatedValues.sample_screen_images.forEach((samp, index) => {
                        if (state._id) {
                            if (samp.image) {
                                if (samp._id) {
                                    formData.append(`sample_screen_images[${index}][image]`, samp.image);
                                    formData.append(`sample_screen_images[${index}][_id]`, samp._id);
                                } else {
                                    formData.append(`sample_screen_images[${index}][image]`, samp.image.name);
                                    formData.append('sample_image', samp.image);
                                }
                            }
                        } else {
                            formData.append('sample_image', samp.image);
                        }

                    });
                }
                setMainLoader(true); // Start loader
                let response;
                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/portfolio/${state._id}`, formData);
                } else {
                    response = await api.postWithToken(`${serverURL}/portfolio`, formData);
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/portfolio');
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

    const handleRemoveFeature = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            features: prevStates.features.filter((_, i) => i !== index), // Remove the tag at the specified index
        }));
    };

    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/portfolio' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>{location.pathname === '/portfolio-add' ? 'Add Portfolio' : 'Edit Portfolio'} </h2>
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
                                                <Textarea label="Description" id={"desc"} required={true} rows="4" type="text" name="desc" value={states.desc || ""}
                                                    onChange={handleChange} placeholder="Enter description"
                                                />
                                                <SingleError error={errors?.desc} />
                                            </Col>
                                            
                                            <Col md={12}>
                                                <SelectInput required={true} id="category" label="Category" select={"Category"} options={teamOptions} name='category' value={states.category}  // Bind to the state
                                                    onChange={handleChange} />
                                                <SingleError error={errors?.category} />
                                            </Col>
                                            {(states.category == "671f912e59efcf3c988cdbad") &&
                                                <Col md={12} lg={12}>
                                                    <LableInput
                                                        label="Website Link"
                                                        className="form-control"
                                                        id="website_link"
                                                        placeholder="Enter website link"
                                                        type="text"
                                                        name='website_link'
                                                        value={states?.website_link || ""}
                                                        onChange={handleChange}
                                                    />
                                                    <SingleError error={errors?.website_link} />
                                                </Col>
                                            }
                                            <Col md={12} lg={12}>
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
                                            <Col md={12} lg={12}>
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
                                            <Col md={4}>
                                                <LableInput
                                                    label="Rating"
                                                    className="form-control"
                                                    placeholder="Enter rating"
                                                    id={"rating"}
                                                    type="number"
                                                    name='rating'
                                                    value={states?.rating || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="Downloads"
                                                    className="form-control"
                                                    placeholder="Enter downloads"
                                                    id={"downloads"}
                                                    type="text"
                                                    name='downloads'
                                                    value={states?.downloads || ""}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="Reviews"
                                                    className="form-control"
                                                    placeholder="Enter reviews"
                                                    id={"reviews"}
                                                    type="text"
                                                    name='reviews'
                                                    value={states?.reviews || ""}
                                                    onChange={handleChange}
                                                />
                                            </Col>

                                            <Col md={12}>
                                                <div className='d-xl-flex align-items-start gap-3'>
                                                    <div className='d-md-flex align-items-start gap-3'>
                                                        <div>
                                                            <FileInput required={true} label="Thumbnail Image" id="image" setImage={setImage} initialImage={image !== null && `${imageURL}${image}`} onChange={handleChange} name='image' />
                                                            <SingleError error={errors?.image} />
                                                        </div>
                                                        <div>
                                                            <FileICon id="icon" label="Banner Image" setIcon={setIcon} initialIcon={icon !== null && `${icon}`} onChange={handleChange} name='icon' />
                                                        </div>
                                                        <div>
                                                            <FileVideo label="Video" setImage={setVideo} initialImage={video !== null && `${imageURL}${video}`} onChange={handleChange} name='video' id="video" />
                                                            {/* <FileVideo label="Video" url={imageURL} setImage={setVideo} initialImage={video !== null && `${video}`} onChange={handleChange} name='video' id={"video"} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
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
                                            {states?.features?.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={index}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileImageVideo
                                                                label="Image/Video"
                                                                setImage={handleImageChange('features', index)} // Update the image for the specific index
                                                                initialImage={ind.image || ''}
                                                                name={`features[${index}][image]`}
                                                            />
                                                            <SingleError error={errors?.features?.[index]?.image} />
                                                        </div>
                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <div className='d-flex align-items-end gap-2'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        label="Title"
                                                                        className="form-control"
                                                                        id={`industry-title-${index}`} // Unique id for each input
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`features[${index}][title]`} // Use indexed name for formData
                                                                        value={ind?.title || ''} // Set value from state
                                                                        onChange={(e) => handleArrayChange('features', [...states.features.slice(0, index), { ...ind, title: e.target.value }, ...states.features.slice(index + 1)])} // Use handleArrayChange
                                                                    />
                                                                    <SingleError error={errors.features?.[index]?.title} />
                                                                </div>
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveFeature(index)}
                                                                        className="btn btn-danger py-2"
                                                                    >
                                                                        <RiDeleteBinLine />
                                                                    </button>
                                                                </div>
                                                            </div>

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
                                                </div>
                                            </Col>
                                            <h5 className='form-title'>Sample Screens</h5>
                                            <Col md={12} className='mb-3'>
                                                <div className='d-flex flex-wrap align-items-start gap-3 w-100'>
                                                    <div>
                                                        <MultipleImageUpload
                                                            label="Image"
                                                            name={`sample_screen_images`}
                                                            setStates={setStates}
                                                            states={states}
                                                        />
                                                    </div>
                                                    {Array.from(states?.sample_screen_images)?.map((image, index) => (
                                                        <div className="image-preview-container mt-4 pt-2" key={index}>
                                                            <div key={index} className="image-preview">
                                                                <img
                                                                    src={image?.image?.name ? URL.createObjectURL(image?.image) : `${imageURL}${image.image}`}
                                                                    alt={`preview ${index}`}
                                                                    className="preview-image sample-screens-image object-fit-scale"
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
                                        </Row>
                                    </form>

                                    <div className="d-md-flex justify-content-between align-items-center mt-3">
                                        <div className='d-flex align-items-center gap-2'>
                                            <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                Status
                                            </label>
                                            <Switch mode={state?.status} onToggle={handleToggle} index={0} />
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

export default IndexPortfolioEdit
