
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

const requireField = [
    "question",
    "answer",
    "status",
    "type",
];
function AddCaseStudiesIndex() {
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

    const option = [
        { value: '1', label: 'Select Categories' },
        { value: '2', label: 'Application Development' },
        { value: '3', label: 'Website Development' },
        { value: '4', label: 'Game Development' },
        { value: '5', label: 'Billing' },
        { value: '6', label: 'About Services' },
    ];

    const [industry, setIndustry] = useState([{ id: Date.now() }]); // Initialize with one industry
    const [features, setFeatures] = useState([{ id: Date.now() }]); // Initialize with one feature
    const [content, setContent] = useState([{ id: Date.now() }]); // Initialize with one feature
    const [faqs, setFaqs] = useState([{ id: Date.now() }]); // Initialize with one feature
    const [tags, setTags] = useState([{ id: Date.now() }]); // Initialize with one feature

    const handleAddIndustry = () => {
        setIndustry([...industry, { id: Date.now() }]); // Add a new industry with a unique ID
    };

    const handleAddFeature = () => {
        setFeatures([...features, { id: Date.now() }]); // Add a new feature with a unique ID
    };

    const handleAddContent = () => {
        setContent([...content, { id: Date.now() }]); // Add a new feature with a unique ID
    };

    const handleAddFaqs = () => {
        setFaqs([...faqs, { id: Date.now() }]); // Add a new feature with a unique ID
    };

    const handleTags = () => {
        setTags([...tags, { id: Date.now() }]); // Add a new feature with a unique ID
    };



    const handleRemoveIndustry = (id) => {
        setIndustry(industry.filter(ind => ind.id !== id)); // Remove the industry by ID
    };

    const handleRemoveFeature = (id) => {
        setFeatures(features.filter(feature => feature.id !== id)); // Remove the feature by ID
    };

    const handleRemoveContent = (id) => {
        setContent(content.filter(content => content.id !== id)); // Remove the content by ID
    };
    const handleRemoveFaqs = (id) => {
        setFaqs(faqs.filter(faqs => faqs.id !== id)); // Remove the content by ID
    };

    const handleRemoveTags = (id) => {
        setTags(tags.filter(tags => tags.id !== id)); // Remove the content by ID
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
                                                    name='name'
                                                // value={states?.name || ""}
                                                // onChange={handleChange}
                                                />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            <Col md={12}>
                                                <LableInput
                                                    label="Subtitle:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter subtitle"
                                                    type="text"
                                                    name='name'
                                                // value={states?.name || ""}
                                                // onChange={handleChange}
                                                />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            <Col md={12}>
                                                {/* <LableInput
                                                    label="Author:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter author name"
                                                    type="text"
                                                    name='name'
                                                // value={states?.name || ""}
                                                // onChange={handleChange}
                                                /> */}
                                                <SelectInput label="Author:" options={options} />
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
                                            <Col md={12}>
                                                <Textarea label="Description:" rows="4" type="text" name="question" value={states.question} onChange={handleChange} />
                                                <SingleError error={errors?.question} />
                                            </Col>

                                            <Col md={12}>
                                                <div className='d-xl-flex align-items-start gap-3'>
                                                    <div className='d-md-flex align-items-start gap-3'>
                                                        <div>
                                                            <FileInput label="Banner:" />
                                                            <SingleError error={errors?.image} />
                                                        </div>
                                                        <div className='mt-3 mt-md-0'>
                                                            <VideoUpload
                                                                label="Video:"
                                                                setVideo={setVideo}
                                                                initialVideo={video}
                                                                onChange={(e) => console.log(e.target.value)}
                                                            />
                                                            <SingleError error={errors?.image} />
                                                        </div>
                                                    </div>
                                                    <Row className='w-100 mt-3 mt-xl-0 g-0'>
                                                        <Col md={12} className='mb-3'>
                                                            <div className='d-flex align-items-end gap-2'>
                                                                <div className='w-100'>
                                                                    <LableInput
                                                                        label="Tags:"
                                                                        className="form-control"
                                                                        // id={`text-${index}`} // Unique id for each input
                                                                        placeholder="Enter tag"
                                                                        type="text"
                                                                    // name={`name-${index}`} // Unique name for each input
                                                                    />
                                                                </div>
                                                                <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleTags}>
                                                                    <PiPlusBold />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        {tags.map((ind, index) => (
                                                            <Col md={12} className='mb-3' key={ind.id}>
                                                                <div className='d-flex align-items-start gap-3 w-100'>
                                                                    <div className='w-100'>
                                                                        <div className='d-flex align-items-end gap-2'>
                                                                            <div className='w-100 label-none'>
                                                                                <LableInput
                                                                                    label=""
                                                                                    className="form-control"
                                                                                    id={`text-${index}`} // Unique id for each input
                                                                                    placeholder="Enter tag"
                                                                                    type="text"
                                                                                    name={`name-${index}`} // Unique name for each input
                                                                                />
                                                                                <SingleError error={errors?.[`name-${index}`]} />
                                                                            </div>

                                                                            <div className="d-flex justify-content-end">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleRemoveTags(ind.id)}
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
                                            {industry.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={ind.id}>
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
                                                                        id={`text-${index}`} // Unique id for each input
                                                                        placeholder="Enter title"
                                                                        type="text"
                                                                        name={`name-${index}`} // Unique name for each input
                                                                    />
                                                                    <SingleError error={errors?.[`name-${index}`]} />
                                                                </div>
                                                            </div>
                                                            <div className='mt-3'>
                                                                <Textarea
                                                                    label="Description:"
                                                                    rows="4"
                                                                    type="text"
                                                                    name={`twitter_link-${index}`} // Unique name for each textarea
                                                                    value={states?.[`twitter_link-${index}`] || ""}
                                                                    onChange={handleChange}
                                                                />
                                                                <SingleError error={errors?.[`twitter_link-${index}`]} />
                                                            </div>
                                                            {index > 0 && (
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveIndustry(ind.id)}
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
                                                            <div className='mt-3'>
                                                                <Textarea
                                                                    label="Description:"
                                                                    rows="4"
                                                                    type="text"
                                                                    name={`feature-twitter_link-${index}`} // Unique name for each textarea
                                                                    value={states?.[`feature-twitter_link-${index}`] || ""}
                                                                    onChange={handleChange}
                                                                />
                                                                <SingleError error={errors?.[`feature-twitter_link-${index}`]} />
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

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Other Image</h5>
                                                </div>
                                            </Col>
                                            <Col md={12}>
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

                                        <Row className='mt-2'>
                                            <Col md={12}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <h5 className='form-title'>Content</h5>
                                                    <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddContent}>
                                                        <PiPlusBold />
                                                    </div>
                                                </div>
                                            </Col>
                                            {content.map((ind, index) => (
                                                <Col md={12} className='mb-3' key={ind.id}>
                                                    <div className='d-md-flex align-items-start gap-3 w-100'>
                                                        <div>
                                                            <FileInput label="Image:" />
                                                            <SingleError error={errors?.image} />
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
                                                                        name={`name-${index}`} // Unique name for each input
                                                                    />
                                                                    <SingleError error={errors?.[`name-${index}`]} />
                                                                </Col>
                                                                <Col xl={6}>
                                                                    <LableInput
                                                                        label="Redirect Link:"
                                                                        className="form-control"
                                                                        id={`text-${index}`} // Unique id for each input
                                                                        placeholder="Enter redirect link"
                                                                        type="text"
                                                                        name={`name-${index}`} // Unique name for each input
                                                                    />
                                                                    <SingleError error={errors?.[`name-${index}`]} />
                                                                </Col>
                                                            </Row>
                                                            <div className='mt-3'>
                                                                <Textarea
                                                                    label="Description:"
                                                                    rows="4"
                                                                    type="text"
                                                                    name={`twitter_link-${index}`} // Unique name for each textarea
                                                                    value={states?.[`twitter_link-${index}`] || ""}
                                                                    onChange={handleChange}
                                                                />
                                                                <SingleError error={errors?.[`twitter_link-${index}`]} />
                                                            </div>
                                                            {index > 0 && (
                                                                <div className="d-flex justify-content-end mt-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveContent(ind.id)}
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
                                            {faqs.map((ind, index) => (
                                                <Col md={12} className='mb-4' key={ind.id}>
                                                    <div className='d-flex align-items-end gap-2'>
                                                        <div className='w-100'>
                                                            <LableInput
                                                                label="Question:"
                                                                className="form-control"
                                                                id={`text-${index}`} // Unique id for each input
                                                                placeholder="Enter question"
                                                                type="text"
                                                                name={`name-${index}`} // Unique name for each input
                                                            />
                                                            <SingleError error={errors?.[`name-${index}`]} />
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <Textarea
                                                            label="Answer:"
                                                            rows="4"
                                                            type="text"
                                                            name={`twitter_link-${index}`} // Unique name for each textarea
                                                            value={states?.[`twitter_link-${index}`] || ""}
                                                            onChange={handleChange}
                                                        />
                                                        <SingleError error={errors?.[`twitter_link-${index}`]} />
                                                    </div>
                                                    {index > 0 && (
                                                        <div className="d-flex justify-content-end mt-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveFaqs(ind.id)}
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

export default AddCaseStudiesIndex
