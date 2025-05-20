
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import LableInput from '../../components/comman/LableInput';
import { getServerURL } from '../../helper/envConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidateFields } from '../../components/validate/ValidateFields';
import ErrorFilter from '../../helper/errorFilter';
import api from '../../API/api';
import { toast } from 'react-toastify';
import { errorResponse } from '../../helper/error';
import SingleError from '../../helper/SingleError';
import LoaderComman from '../../components/comman/LoaderComman';


function CategoriesAdd() {

    const location = useLocation();
    const state = location.state || {};

    const requireField = [
        "name",
    ];

    const [errors, setErrors] = useState({});
    const serverURL = getServerURL();
    const [submitCount, setSubmitCount] = useState(0);
    // const [status, setStatus] = useState(state.status || 1)
    const [status, setStatus] = useState(state.status !== undefined ? state.status : 1);
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

            if (!validationErrors[name]) {
                setErrors((prevErrors) => {
                    const { [name]: removedError, ...rest } = prevErrors; // Destructure to remove error
                    return rest; // Return new errors without the removed error
                });
            }
        }
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    }


    const addCategory = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setSubmitCount(prevCount => prevCount + 1);
        const updatedValues = { ...states, image, status };
        let validationErrors = ValidateFields(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                setMainLoader(true); // Start loader
                let response;
                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/blog-category/${state._id}`, { name: updatedValues.name, status: status });
                } else {
                    response = await api.postWithToken(`${serverURL}/blog-category`, { name: states.name, status: status });
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/category');
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
    const closeCategory = async (e) => {
        setStates({});
        navigate('/category');
    }

    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setStates({
                name: state.name,
                status: state.status,
            });
        }
    }, [state]);



    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/category' className='back-btn d-flex justify-content-center align-items-center' />
                    {/* <h2 className='page-title'>Edit Category</h2> */}
                    <h2 className='page-title'>{location.pathname === '/category-edit' ? 'Edit Category' : 'Add Category'} </h2>
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
                                                    label="	Name:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter name"
                                                    type="text"
                                                    name='name'
                                                    value={states?.name || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.name} />
                                            </Col>
                                            {/* <Col md={6}>
                                                <SelectInput label="Job Time:" options={option} />
                                            </Col> */}
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
                                            <CommanButton className="save-btn" text="Save" handleSubmit={addCategory} />
                                            <CommanButton className="cancel-btn" text="Cancel" handleSubmit={closeCategory} />
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

export default CategoriesAdd
