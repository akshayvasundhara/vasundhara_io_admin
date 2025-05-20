
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import LableInput from '../../components/comman/LableInput';
import FileInput from '../../components/comman/FileInput';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import SelectInput from '../../components/comman/SelectInput';
import PlushLableInput from '../../components/comman/PlushLableInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidateFields } from '../../components/validate/ValidateFields';
import ErrorFilter from '../../helper/errorFilter';
import LoaderComman from '../../components/comman/LoaderComman';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import SingleError from '../../helper/SingleError';
import api from '../../API/api';
import { toast } from 'react-toastify';
import { errorResponse } from '../../helper/error';
import { PiPlusBold } from 'react-icons/pi';
import Textarea from '../../components/comman/Textarea';

const requireField = [
    "job_name",
    "experience",
    "slug",
    "qualification",
    "status",
    "image",
    "location",
    "responsibilities",
    "job_time",
    "skill",
    "no_of_openings"
];

function AddHirings() {

    const location = useLocation();
    const state = location.state || {};
    const [errors, setErrors] = useState({});
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [submitCount, setSubmitCount] = useState(0);
    // const [status, setStatus] = useState(state.status || 1)
    const [status, setStatus] = useState(state.status !== undefined ? state.status : 1);

    const [states, setStates] = useState({
        job_name: '',
        experience: '',
        qualification: '',
        status: '',
        seo: '',
        slug: '',
        no_of_openings: '',
        job_time: 'full time',
        responsibilities: [''],
        skill: [''],
        location: ['']
    });
    const [image, setImage] = useState(null);
    const [mainLoader, setMainLoader] = useState(false);
    const navigate = useNavigate();

    // Function to handle the toggle switch
    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
    };

    const option = [
        { value: 'full time', label: 'Full Time' },
        { value: 'half time', label: 'Half Time' },
    ];

    // Handle Change
    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        if (submitCount > 0) {
            let validationErrors = ValidateFields({ ...states, [name]: value, image: newValue });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
                delete errors.image;
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
            const updatedValues = { ...states, [name]: newValues, image: newValues };
            let validationErrors = ValidateFields(updatedValues);
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
                delete errors.image;
            }
        }
    };

    // Add Edit Hiring
    const addHiring = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setSubmitCount(prevCount => prevCount + 1);
        const updatedValues = { ...states, image, status };

        let validationErrors = ValidateFields(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);
        if (image) {
            delete errors.image;
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = new FormData(); // Create FormData for file upload
                formData.append('job_name', updatedValues.job_name);
                formData.append('experience', updatedValues.experience);
                formData.append('slug', updatedValues.slug?.toLowerCase());
                formData.append('qualification', updatedValues.qualification);
                formData.append('job_time', updatedValues.job_time);
                formData.append('no_of_openings', updatedValues.no_of_openings);
                formData.append('status', status);
                formData.append('image', image);
                formData.append('seo', updatedValues.seo || "");

                // Pass arrays with indices
                updatedValues.location.forEach((loc, index) => {
                    formData.append(`location[${index}]`, loc);
                });
                updatedValues.responsibilities.forEach((resp, index) => {
                    formData.append(`responsibilities[${index}]`, resp);
                });
                updatedValues.skill.forEach((skl, index) => {
                    formData.append(`skill[${index}]`, skl);
                });

                setMainLoader(true); // Start loader
                let response;
                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/hiring/${state._id}`, formData);
                } else {
                    response = await api.postWithToken(`${serverURL}/hiring`, formData);
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/hirings');
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
    };


    // Close Hiring
    const closeHirings = async (e) => {
        setStates({});
        navigate('/hirings');
    }

    // Get State 
    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setStates({
                job_name: state.job_name,
                experience: state.experience,
                slug: state.slug,
                seo: state.seo,
                qualification: state.qualification,
                status: state.status,
                no_of_openings: state.no_of_openings,
                job_time: state.job_time,
                responsibilities: state.responsibilities || [''],  // Set default to empty array if not available
                skill: state.skill || [''],  // Set default to empty array if not available
                location: state.location || ['']
            });
            if (state.image) {
                const fullImageUrl = `${imageURL}${state.image}`;
                setImage(fullImageUrl);
            } else {
                setImage(null); // Clear image if there's no valid image
            }
        }
    }, [state]);

    const handleAddRes = () => {
        setStates((prevStates) => ({
            ...prevStates,
            responsibilities: [...prevStates.responsibilities, ''], // Add a new empty tag field
        }));
    }


    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/hirings' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>{location.pathname === '/hirings-edit' ? 'Edit Hiring' : 'Add Hiring'} </h2>
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
                                                    label="Job Name:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter name"
                                                    type="text"
                                                    name='job_name'
                                                    value={states?.job_name || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.job_name} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="Experience:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter experience"
                                                    type="text"
                                                    name='experience'
                                                    value={states?.experience || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.experience} />
                                            </Col>
                                            <Col md={12}>
                                                <LableInput
                                                    required={true}
                                                    label="Unique Route"
                                                    className="form-control"
                                                    id="slug"
                                                    placeholder="Enter unique route"
                                                    type="text"
                                                    name='slug'
                                                    value={states?.slug || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.slug} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="Qualification:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter qualification"
                                                    type="text"
                                                    name='qualification'
                                                    value={states?.qualification || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.qualification} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <SelectInput
                                                    label="Job Time:"
                                                    options={option}
                                                    name="job_time"  // Add name here
                                                    value={states.job_time}  // Bind to the state
                                                    onChange={handleChange}  // Call handleChange to update state
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <LableInput
                                                    label="No. of Openings:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter no of openings"
                                                    type="number"
                                                    name='no_of_openings'
                                                    value={states?.no_of_openings || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.no_of_openings} />
                                            </Col>
                                            <Col md={12}>
                                                <PlushLableInput
                                                    label="Location:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter location"
                                                    type="text"
                                                    name='location'
                                                    value={states?.location || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={(newValues) => handleArrayChange('location', newValues)}
                                                />
                                                <SingleError error={errors?.location} />
                                            </Col>


                                            <Col md={12}>
                                                <PlushLableInput
                                                    label="Responsibilities:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter responsibilities"
                                                    type="text"
                                                    name='responsibilities'
                                                    value={states?.responsibilities || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={(newValues) => handleArrayChange('responsibilities', newValues)}
                                                />
                                                <SingleError error={errors?.responsibilities} />
                                            </Col>
                                            <Col md={12}>
                                                <PlushLableInput
                                                    label="Skill:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter skill"
                                                    type="text"
                                                    name='skill'
                                                    value={states?.skill || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={(newValues) => handleArrayChange('skill', newValues)}
                                                />
                                                <SingleError error={errors?.skill} />
                                            </Col>

                                            <Col md={12}>
                                                <Textarea id={"seo"} label="Head Tags By SEO" rows="9" type="text" name="seo" value={states?.seo} onChange={handleChange} />
                                            </Col>

                                            <Col md={12} lg={6}>
                                                <FileInput label="Image:" setImage={setImage} initialImage={image} onChange={handleChange} />
                                                <SingleError error={errors?.image} />
                                            </Col>
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
                                            <CommanButton className="save-btn" text="Save" handleSubmit={addHiring} />
                                            <CommanButton className="cancel-btn" text="Cancel" handleSubmit={closeHirings} />
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

export default AddHirings
