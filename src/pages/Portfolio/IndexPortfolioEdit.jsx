
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
import MultipleImageUpload from '../../components/comman/MultipleInageUpload';

const requireField = [
    "question",
    "answer",
    "status",
    "type",
];
function IndexPortfolioEdit() {
    const location = useLocation();
    const state = location.state || {};
    const navigate = useNavigate();
    const serverURL = getServerURL();
    const [mainLoader, setMainLoader] = useState(true);
    const [options, setOptions] = useState([]);
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitCount, setSubmitCount] = useState(0);
    // const [status, setStatus] = useState(state.status || 1)
    const [status, setStatus] = useState(state.status !== undefined ? state.status : 1);
    const [states, setStates] = useState({
        question: '',
        answer: '',
        status: '',
        type: ['']
    });

    // Function to handle the toggle switch
    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
    };

    // Handle Change
    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
        if (submitCount > 0) {
            let validationErrors = ValidateFields({ ...states, [name]: value });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (!validationErrors[name]) {
                setErrors((prevErrors) => {
                    const { [name]: removedError, ...rest } = prevErrors; // Destructure to remove error
                    return rest; // Return new errors without the removed error
                });
            }
        }

    }
    // Handle array change for location, res, skill
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

            if (!validationErrors[name]) {
                setErrors((prevErrors) => {
                    const { [name]: removedError, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
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
                question: state.question,
                answer: state.answer,
                status: state.status,
                type: state.type
            });
        }
    }, [state, options]);

    // Get FAQ Type
    const getOptions = async () => {
        try {
            const response = await api.getWithToken(`${serverURL}/faqs_type`);
            if (response.data.success === true) {
                const formattedOptions = response.data.data.data.map(item => ({
                    label: item.label,
                    value: item.value,
                }));
                setOptions(formattedOptions);
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    };

    useEffect(() => {
        getOptions();
    }, [])

    // Add Edit FAQ
    const addFaq = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setSubmitCount(prevCount => prevCount + 1);
        const updatedValues = { ...states, status };
        let validationErrors = ValidateFields(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                setMainLoader(true); // Start loader
                let response;
                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/faqs/${state._id}`, updatedValues);
                } else {
                    response = await api.postWithToken(`${serverURL}/faqs`, updatedValues);
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/faqs');
                }
                else if (response?.data?.success === false) {
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

    const [features, setFeatures] = useState([{ id: Date.now() }]); // Initialize with one feature


    const handleAddFeature = () => {
        setFeatures([...features, { id: Date.now() }]); // Add a new feature with a unique ID
    };

    const handleRemoveFeature = (id) => {
        setFeatures(features.filter(feature => feature.id !== id)); // Remove the feature by ID
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
                                                    label="Title:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter title"
                                                    type="text"
                                                    name='name'
                                                // value={states?.name || ""}
                                                // onChange={handleChange}
                                                />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            <Col md={12}>
                                                <Textarea label="Description:" rows="4" type="text" name="question" value={states.question} onChange={handleChange} />
                                                <SingleError error={errors?.question} />
                                            </Col>
                                            <Col md={12}>
                                                <SelectInput label="Category:" options={options} />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="Google Play Store:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter google play store link"
                                                    type="text"
                                                    name='name'
                                                // value={states?.name || ""}
                                                // onChange={handleChange}
                                                />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            <Col md={12} lg={6}>
                                                <LableInput
                                                    label="App Store:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter app store link"
                                                    type="text"
                                                    name='name'
                                                // value={states?.name || ""}
                                                // onChange={handleChange}
                                                />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="Rating:"
                                                    className="form-control"
                                                    placeholder="Enter rating"
                                                    type="text"
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="Downloads:"
                                                    className="form-control"
                                                    placeholder="Enter downloads"
                                                    type="text"
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="Reviews:"
                                                    className="form-control"
                                                    placeholder="Enter reviews"
                                                    type="text"
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <div className='d-xl-flex align-items-start gap-3'>
                                                    <div className='d-md-flex align-items-start gap-3'>
                                                        <div>
                                                            <FileInput label="Image:" />
                                                            <SingleError error={errors?.image} />
                                                        </div>
                                                        <div>
                                                            <FileInput label="Icon:" />
                                                            <SingleError error={errors?.image} />
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
                                            {features.map((feature, index) => (
                                                <Col md={12} className='mb-3' key={feature.id}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileInput label="Image:" />
                                                            <SingleError error={errors?.image} />
                                                        </div>
                                                        <div className='w-100 mt-3 mt-md-0'>
                                                            <div className='d-flex align-items-end gap-2'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        label="Title:"
                                                                        className="form-control"
                                                                        id={`feature-text-${index}`} // Unique id for each input
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`feature-name-${index}`} // Unique name for each input
                                                                    />
                                                                    <SingleError error={errors?.[`feature-name-${index}`]} />
                                                                </div>
                                                            </div>
                                                            {index > 0 && (
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveFeature(feature.id)}
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
                                                <div className='d-flex align-items-start gap-3 w-100'>
                                                    <div>
                                                        <MultipleImageUpload label="Image:" />
                                                    </div>
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
                                                Status:
                                            </label>
                                            <Switch mode={state.status} onToggle={handleToggle} index={0} />
                                        </div>
                                        <div className='d-flex justify-content-end gap-2 mt-3 mt-md-0'>
                                            <CommanButton className="save-btn" text="Save" handleSubmit={addFaq} />
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
