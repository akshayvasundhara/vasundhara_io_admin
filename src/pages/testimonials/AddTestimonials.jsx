
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import LableInput from '../../components/comman/LableInput';
import SelectInput from '../../components/comman/SelectInput';
import SelectMultiple from '../../components/comman/SelectMultiple';
import Textarea from '../../components/comman/Textarea';
import FileInput from '../../components/comman/FileInput';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import { getImageURL, getServerURL } from '../../helper/envConfig';
import SingleError from '../../helper/SingleError';
import ErrorFilter from '../../helper/errorFilter';
import { ValidateFields } from '../../components/validate/ValidateFields';
import api from '../../API/api';
import { errorResponse } from '../../helper/error';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoaderComman from '../../components/comman/LoaderComman';
const requireField = [
    "name",
    "designation",
    "description",
    "status",
    "image",
];

function AddTestimonials() {

    const location = useLocation();
    const state = location.state || {};
    // State to track the dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [errors, setErrors] = useState({});
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [submitCount, setSubmitCount] = useState(0);
    const [status, setStatus] = useState(state.status || 1);
    const [states, setStates] = useState({});
    const [image, setImage] = useState(null);
    const [mainLoader, setMainLoader] = useState(false);
    const navigate = useNavigate();
    // Function to handle the toggle switch
    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
    };


    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        if (submitCount > 0) {
            let validationErrors = ValidateFields({ ...states, [name]: value });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);

            if (Object.keys(validationErrors)?.length === 0) {
                delete errors[name];
            }
        }
        if (name === 'image') {
            setImage(newValue);
        } else {
            setStates((prevValues) => ({
                ...prevValues,
                [name]: newValue,
            }));
        }
    }

    const addTestimonial = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const updatedValues = { ...states, image, status };
        let validationErrors = ValidateFields(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = new FormData(); // Create FormData for file upload
                formData.append('name', updatedValues.name);
                formData.append('designation', updatedValues.designation);
                formData.append('description', updatedValues.description);
                formData.append('image', image);
                formData.append('status', status);

                setMainLoader(true); // Start loader

                if (state._id) {
                    const response = await api.patchWithToken(`${serverURL}/testimonial/${state._id}`, formData);
                    if (response?.data.success === true) {
                        toast.info(response?.data.message);
                        navigate('/testimonials');
                    } else if (response?.data?.success === false) {
                        if (typeof response?.data?.message === "string")
                            toast.error(response?.data?.message);
                    }
                } else {
                    // Call the add API
                    const response = await api.postWithToken(`${serverURL}/testimonial`, formData);
                    if (response?.data.success === true) {
                        toast.info(response?.data.message);
                        navigate('/testimonials');
                    } else if (response?.data?.success === false) {
                        if (typeof response?.data?.message === "string")
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
    }


    const closeTestimonial = async (e) => {
        setStates({});
        navigate('/testimonials');
    }


    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setStates({
                name: state.name,
                designation: state.designation,
                description: state.description,
                status: state.status,
            });
            if (state.image) {
                const fullImageUrl = `${imageURL}${state.image}`;
                setImage(fullImageUrl);
            } else {
                setImage(null); // Clear image if there's no valid image
            }
        }
    }, [state]);

    return (
        <>
            {mainLoader ? (
                <LoaderComman />
            ) : (
                <Layout>
                    <div className='d-flex align-items-center gap-2'>
                        <LinkButton text={<ImArrowLeft />} to='/testimonials' className='back-btn d-flex justify-content-center align-items-center' />
                        <h2 className='page-title'>{location.pathname === '/testimonials-edit' ? 'Edit Testimonial' : 'Create Testimonial'} </h2>
                    </div>

                    <div className='font-family-poppins mt-3'>
                        <Row xs={12} className="table-card">
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <form action="">
                                            <Row className='g-3'>
                                                <Col md={6}>
                                                    <LableInput
                                                        label="Name:"
                                                        className="form-control"
                                                        id="text"
                                                        placeholder="Enter name"
                                                        type="text"
                                                        name='name'
                                                        value={states?.name || ""}
                                                        onChange={handleChange}
                                                    />
                                                    <SingleError error={errors?.name} />
                                                </Col>
                                                <Col md={6}>
                                                    <LableInput
                                                        label="Designation"
                                                        className="form-control"
                                                        id="text"
                                                        placeholder="Enter designation"
                                                        type="text"
                                                        name='designation'
                                                        value={states?.designation || ""}
                                                        onChange={handleChange}
                                                    />
                                                    <SingleError error={errors?.designation} />
                                                </Col>
                                                <Col md={6}>
                                                    <Textarea label="Description:" rows="9" type="text" name="description" value={states?.description || ""} onChange={handleChange} />
                                                    <SingleError error={errors?.description} />
                                                </Col>
                                                <Col md={6}>
                                                    <FileInput label="Image:" setImage={setImage} initialImage={image} />
                                                    <SingleError error={errors?.image} />
                                                </Col>
                                            </Row>
                                        </form>

                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div className='d-flex align-items-center gap-2'>
                                                <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                    Status:
                                                </label>
                                                <Switch mode={state.status} onToggle={handleToggle} index={0} />
                                            </div>
                                            <div className='d-flex gap-2'>
                                                <CommanButton className="save-btn" text="Save" handleSubmit={addTestimonial} />
                                                <CommanButton className="cancel-btn" text="Cancel" handleSubmit={closeTestimonial} />
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                    </div>
                </Layout >
            )}

        </>
    )
}

export default AddTestimonials
