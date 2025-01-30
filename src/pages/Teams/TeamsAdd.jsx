
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import LableInput from '../../components/comman/LableInput';
import Textarea from '../../components/comman/Textarea';
import FileInput from '../../components/comman/FileInput';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import { useLocation, useNavigate } from 'react-router-dom';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import SingleError from '../../helper/SingleError';
import { ValidateFields } from '../../components/validate/ValidateFields';
import ErrorFilter from '../../helper/errorFilter';
import { errorResponse } from '../../helper/error';
import { toast } from 'react-toastify';
import api from '../../API/api';
import { RiDeleteBinLine } from 'react-icons/ri';
import { PiPlusBold } from 'react-icons/pi';
import FileInputComman from '../../components/comman/FileInputComman';

const requireField = [
    "name",
    "slug",
    "designation",
    "description",
    "image"
];


function TeamsAdd() {
    const location = useLocation();
    const state = location.state || {};

    const [errors, setErrors] = useState({});
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [submitCount, setSubmitCount] = useState(0);
    // const [status, setStatus] = useState(state.status || 1)
    const [status, setStatus] = useState(state.status !== undefined ? state.status : 1);
    const [states, setStates] = useState({ description: [''], expertise: [{ image: null, title: '' }] });
    const [image, setImage] = useState(null);
    const [mainLoader, setMainLoader] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0));
    };

    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        if (submitCount > 0) {
            let validationErrors = ValidateFields({ ...states, [name]: value });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
            }
        }
        if (name === "mobile_no") {
            let numericValue = newValue.replace(/\D/g, '');
            if (numericValue.length > 10) {
                numericValue = numericValue.slice(0, 10);
            }
            setStates((prevValues) => ({
                ...prevValues,
                [name]: numericValue,
            }));
        } else {
            setStates((prevValues) => ({
                ...prevValues,
                [name]: newValue,
            }));
        }
    }

    const addTeam = async (e) => {
        e.preventDefault();
        setSubmitCount(prevCount => prevCount + 1);
        const updatedValues = { ...states, status };
        let validationErrors = ValidateFields(updatedValues);

        validationErrors = ErrorFilter(validationErrors, requireField);
        if (image) {
            delete errors.image;
        }
        if (states?.mobile_no) {
            const mobileNumberPattern = /^\d{10}$/; // Exactly 10 digits
            if (!mobileNumberPattern.test(states?.mobile_no)) {
                validationErrors.mobile_no = "Invalid mobile number, must be exactly 10 digits";
            }
        }

        if (states?.twitter_link) {
            const urlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
            if (!urlPattern.test(states?.twitter_link)) {
                validationErrors.twitter_link = "Invalid Twitter link";
            }
        }

        if (states?.linkedin_link) {
            const urlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
            if (!urlPattern.test(states?.linkedin_link)) {
                validationErrors.linkedin_link = "Invalid LinkedIn link";
            }
        }

        if (states?.facebook_link) {
            const urlPattern = /^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/i;
            if (!urlPattern.test(states?.facebook_link)) {
                validationErrors.facebook_link = "Invalid Facebook link";
            }
        }

        if (Array.isArray(updatedValues?.expertise)) {
            updatedValues?.expertise.forEach((item, index) => {
                const { title, image } = item;
                let expertiseErrors = {};
                if (title || image) {
                    if (!title) expertiseErrors.title = "Title is required if any field is filled";
                    if (!image) expertiseErrors.image = "Image is required if any field is filled";
                }
                if (Object.keys(expertiseErrors).length > 0) {
                    validationErrors.expertise[index] = expertiseErrors;
                }
            });

            if (validationErrors?.expertise?.every((error) => Object.keys(error).length === 0)) {
                delete validationErrors.expertise;
            }
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors)?.length) {
            Object.entries(validationErrors)?.map(([key], i) => {
                if (i == 0)
                    document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
            });
        }

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = new FormData(); // Create FormData for file upload
                formData.append('name', updatedValues.name);
                formData.append('slug', updatedValues.slug?.toLowerCase());
                formData.append('designation', updatedValues.designation);
                // formData.append('description', updatedValues.description);
                formData.append('image', image);
                formData.append('email', updatedValues?.email || "");
                formData.append('mobile_no', updatedValues?.mobile_no || "");
                formData.append('status', status);
                formData.append('linkedin_link', updatedValues.linkedin_link || "");
                formData.append('twitter_link', updatedValues.twitter_link || "");
                formData.append('facebook_link', updatedValues.facebook_link || "");
                formData.append("seo", updatedValues?.seo || '');

                if (Array.isArray(updatedValues.description) && updatedValues.description.length > 0) {
                    updatedValues.description.forEach((desc, index) => {
                        if (desc && desc.trim().length > 0) {
                            formData.append(`description[${index}]`, desc);
                        }
                    });
                }

                if (Array.isArray(updatedValues.expertise)) {
                    updatedValues.expertise.forEach((expertise, index) => {
                        if (expertise?.title && expertise.image) {
                            formData.append(`expertise[${index}][title]`, expertise?.title);
                            if (expertise?._id)
                                formData.append(`expertise[${index}][_id]`, expertise?._id);
                            formData.append(`expertise[${index}][image]`, expertise?.image?.name ? expertise?.image?.name : expertise?.image);
                            formData.append(`expertise_image`, expertise?.image);
                        }

                    });
                }

                setMainLoader(true);
                let response;

                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/team/${state._id}`, formData);
                } else {
                    response = await api.postWithToken(`${serverURL}/team`, formData);
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/teams');
                } else if (response?.data?.success === false) {
                    if (typeof response?.data?.message === "string")
                        toast.error(response?.data?.message);
                }
            } catch (error) {
                setMainLoader(false);
                errorResponse(error);
            } finally {
                setMainLoader(false);
            }
        }
    }

    const closeTestimonial = async (e) => {
        setStates({});
        navigate('/teams');
    }

    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setStates({
                name: state.name,
                slug: state?.slug,
                designation: state.designation,
                description: state.description || [''],
                status: state.status,
                twitter_link: state.twitter_link,
                facebook_link: state.facebook_link,
                linkedin_link: state.linkedin_link,
                other_link: state.other_link,
                email: state.email,
                mobile_no: state.mobile_no,
                expertise: state?.expertise?.length ? state?.expertise : [{ image: null, title: '' }],
                image: state?.image || null,
                seo: state?.seo || ""
            });
            if (state.image) {
                const fullImageUrl = `${imageURL}${state.image}`;
                setImage(fullImageUrl);
            } else {
                setImage(null);
            }
        }
    }, [state]);

    const handleAddExpertise = () => {
        const data = states?.expertise
        if (data?.length > 0) {
            if (data[data?.length - 1]?.image !== null && !data[data?.length - 1]?.title !== '') {
                setStates((prevStates) => ({
                    ...prevStates,
                    expertise: [...prevStates.expertise, { image: null, title: '' }],
                }));
            }
            else {
                alert('Please enter image and title');
            }
        }
    }

    const handleRemoveExpertise = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            expertise: prevStates.expertise.filter((_, i) => i !== index),
        }));
    };

    const handleArrayChange = (name, newValues) => {
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValues,
        }));

        if (submitCount > 0) {
            const updatedValues = { ...states, [name]: newValues };
            let validationErrors = ValidateFields(updatedValues);
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
            }
        }
    };

    const handleImageChange = (type, index) => (file) => {
        const updatedArray = [...states[type]];
        updatedArray[index].image = file;
        setStates({ ...states, [type]: updatedArray });
    };

    const handleAddDescription = () => {
        setStates((prevStates) => ({
            ...prevStates,
            description: [...prevStates.description, ''],
        }));
    }

    const handleRemoveDescription = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            description: prevStates.description.filter((_, i) => i !== index)
        })
        )
    };

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/teams' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>{location.pathname === '/teams-edit' ? 'Edit Team' : 'Add Team'} </h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <form action="">
                                        <Row className='g-3'>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    required={true}
                                                    label="Name"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Enter name"
                                                    type="text"
                                                    name='name'
                                                    value={states?.name || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            <Col md={12}>
                                                <LableInput
                                                    required={true}
                                                    label="Unique Route"
                                                    className="form-control"
                                                    id="slug"
                                                    placeholder="Enter unique"
                                                    type="text"
                                                    name='slug'
                                                    value={states?.slug || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.slug} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    required={true}
                                                    label="Designation"
                                                    className="form-control"
                                                    id="designation"
                                                    placeholder="Enter designation"
                                                    type="text"
                                                    name='designation'
                                                    value={states?.designation || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.designation} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="Email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Enter email"
                                                    type="email"
                                                    name='email'
                                                    value={states?.email || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.email} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="Mobile Number"
                                                    className="form-control"
                                                    id="mobile_no"
                                                    placeholder="Enter mobile number"
                                                    type="text"
                                                    name='mobile_no'
                                                    value={states?.mobile_no || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.mobile_no} />
                                            </Col>
                                            <Row className='w-100 mt-3 mt-xl-0 g-0'>
                                                <Col md={12}>
                                                    <div className='mt-3 d-flex justify-content-between align-items-center' id='description'>
                                                        <h5 className='form-title mb-0'>Description<span className='text-danger'>*</span></h5>
                                                        <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddDescription}>
                                                            <PiPlusBold />
                                                        </div>
                                                    </div>
                                                </Col>
                                                {states?.description?.map((tag, index) => (
                                                    <Col md={12} key={index}>
                                                        <div className='d-md-flex align-items-start gap-3 w-100 mt-3'>
                                                            <div className='w-100 mt-3 mt-md-0 d-flex align-items-center gap-2'>
                                                                <div className='d-flex align-items-end gap-2 w-100 label-none'>
                                                                    <div className='w-100'>
                                                                        <LableInput
                                                                            className="form-control w-100"
                                                                            id={`description[${index}]`}
                                                                            placeholder="Enter title"
                                                                            type="text"
                                                                            name={`description[${index}]`}
                                                                            value={tag || ''}
                                                                            onChange={(e) =>
                                                                                handleArrayChange('description', [
                                                                                    ...states.description.slice(0, index),
                                                                                    e.target.value,
                                                                                    ...states.description.slice(index + 1)
                                                                                ])
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-end">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveDescription(index)}
                                                                        className="btn btn-danger py-2">
                                                                        <RiDeleteBinLine />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                                <SingleError error={errors?.description} />
                                            </Row>
                                            {/* <Col md={12} lg={12}>
                                                <Textarea label="Description" rows="9" type="text" name="description" value={states?.description || ""} onChange={handleChange} />
                                                <SingleError error={errors?.description} />
                                            </Col> */}
                                            <Col md={12} lg={12} className='team_images'>
                                                <FileInput required={true} label="Image" setImage={setImage} initialImage={image} onChange={handleChange} />
                                                <SingleError error={errors?.image} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <Textarea label="Linkedin" id="linkedin_link" rows="2" type="text" name="linkedin_link" value={states?.linkedin_link || ""} onChange={handleChange} />
                                                <SingleError error={errors?.linkedin_link} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <Textarea label="Twitter" id="twitter_link" rows="2" type="text" name="twitter_link" value={states?.twitter_link || ""} onChange={handleChange} />
                                                <SingleError error={errors?.twitter_link} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <Textarea label="Facebook" id="facebook_link" rows="2" type="text" name="facebook_link" value={states?.facebook_link || ""} onChange={handleChange} />
                                                <SingleError error={errors?.facebook_link} />
                                            </Col>
                                            {/* <Col md={12} lg={6}>
                                                <Textarea label="Other:" rows="4" type="text" name="other_link" value={states?.other_link || ""} onChange={handleChange} />
                                                <SingleError error={errors?.other_link} />
                                            </Col> */}
                                        </Row>

                                        <Col md={12}>
                                            <Textarea id={"seo"} label="Head Tags By SEO" rows="9" type="text" name="seo" value={states?.seo} onChange={handleChange} />
                                            <SingleError error={errors?.seo} />
                                        </Col>

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Expertise</h5>
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddExpertise}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>
                                            {states?.expertise?.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={ind.id}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileInputComman
                                                                label="Image"
                                                                id={`expertise[${index}][image]`}
                                                                setImage={handleImageChange('expertise', index)}
                                                                initialImage={ind.image || ''}
                                                                name={`expertise[${index}][image]`}
                                                            />
                                                            <SingleError error={errors.expertise?.[index]?.image} />
                                                            {/* <SingleError error={errors.content?.[index]?.image} /> */}
                                                        </div>
                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <Row className='g-3'>
                                                                <Col xl={12}>
                                                                    <LableInput
                                                                        label="Title"
                                                                        className="form-control"
                                                                        id={`expertise[${index}][title]`}
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`expertise[${index}][title]`}
                                                                        value={ind.title || ''}
                                                                        onChange={(e) => handleArrayChange('expertise', [...states.expertise.slice(0, index), { ...ind, title: e.target.value }, ...states.expertise.slice(index + 1)])} // Use handleArrayChange
                                                                    />
                                                                    <SingleError error={errors.expertise?.[index]?.title} />
                                                                </Col>

                                                            </Row>

                                                            {/* {index > 0 && ( */}
                                                            <div className="d-flex justify-content-end mt-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveExpertise(index)}
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
                                            <Switch mode={state.status} onToggle={handleToggle} index={0} />
                                        </div>
                                        <div className='d-flex justify-content-end gap-2 mt-3 mt-md-0'>
                                            <CommanButton className="save-btn" text="Save" handleSubmit={addTeam} />
                                            <CommanButton className="cancel-btn" text="Cancel" handleSubmit={closeTestimonial} />
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

export default TeamsAdd