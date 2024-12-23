import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LinkButton from '../components/comman/LinkButton'
import LableInput from '../components/comman/LableInput';
import { getServerURL } from '../helper/envConfig';
import { useNavigate } from 'react-router-dom';
import SingleError from '../helper/SingleError';
import { validate } from './LoginSchema';
import api from '../API/api';
import { login } from '../helper/auth';
import { toast } from 'react-toastify';
import { errorResponse } from '../helper/error';

function Login() {
    const initialValues = {
        email: "",
        password: "",
    };

    const serverURL = getServerURL();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSubmitCount(1);
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        if (submitCount > 0) {
            const validationErrors = validate({ ...values, [name]: newValue });
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
            }
        }
        setValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedValues = { ...values };

        const validationErrors = validate(updatedValues);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                api.post(`${serverURL}/login`, updatedValues)
                    .then((response) => {

                        setSubmitCount(1);
                        setLoading(false);
                        if (response?.data.success === true) {
                            login(response?.data.data);
                            toast.info(response?.data.message);
                            navigate('/dashboard');
                        } else if (response?.data?.success === false) {
                            if (typeof response?.data?.message === "string")
                                toast.error(response?.data?.message);
                        }
                    })
                    .catch((error) => {
                        setLoading(false);
                        errorResponse(error);
                    })
            } catch (error) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        document.title = "Vasundhara | Login";
    }, [window.location.pathname])
    
    return (
        <>
            <section className='login font-family-poppins'>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-100">
                        <div className="col-xxl-5 col-xl-9 col-lg-6 col-md-6 col-sm-8 col-12">
                            <div className="card custom-card my-auto border">
                                <div className="card-body p-4">
                                    <div className='d-flex justify-content-center py-4'>
                                        <img src="../images/logo/vasundhara.png" width={250} alt="" />
                                    </div>
                                    <div className="row gy-3 mt-2 single-error">
                                        <div className="col-xl-12 label-none">
                                            <LableInput
                                                // label="Email:"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter your email"
                                                type="text"
                                                name='email'
                                                value={values?.email || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <SingleError error={errors?.email} />
                                        <div className="col-xl-12 label-none">
                                            <div className="position-relative">
                                                <LableInput
                                                    // label="Password:"
                                                    className="form-control create-password-input"
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    type={isPasswordVisible ? 'text' : 'password'}
                                                    name='password'
                                                    value={values?.password || ''}
                                                    onkeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <span
                                                    className="position-absolute end-0 top-50 translate-middle-y me-2 cursor-pointer"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            {/* <div className="mt-2">
                                                <label
                                                    className="form-check-label text-muted fw-normal"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    I forgot my password
                                                </label>
                                            </div> */}
                                        </div>
                                        <SingleError error={errors?.password} />
                                    </div>
                                    <div className="d-grid mt-5">
                                        <LinkButton className={`text-decoration-none secondary-button ${Boolean(loading) && "btnDisable"}`} text={Boolean(loading) ? "Loading... " : "Sign In"} onClick={handleSubmit} disabled={loading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
