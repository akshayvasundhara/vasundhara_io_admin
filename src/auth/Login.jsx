import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LinkButton from '../components/comman/LinkButton'
import LableInput from '../components/comman/LableInput';

function Login() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <>
            <section className='login font-family-poppins'>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-100">
                        <div className="col-xxl-5 col-xl-9 col-lg-6 col-md-6 col-sm-8 col-12">
                            <div className="card custom-card my-auto border">
                                <div className="card-body p-4">
                                    <div className='d-flex justify-content-center py-4'>
                                        <img src="../images/logo/logo.svg" width={250} alt="" />
                                    </div>
                                    <p className="mb-1 text-start fs-4 fw-500">vasundhara us</p>
                                    <p className="mb-4 text-muted op-7 fw-400 text-start">
                                        Sign in to start your session
                                    </p>
                                    <div className="row gy-3">
                                        <div className="col-xl-12">
                                            <LableInput
                                                label="Email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter your email"
                                                type="text"
                                            />
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="position-relative">
                                                <LableInput
                                                    label="Password"
                                                    className="form-control create-password-input"
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    type={isPasswordVisible ? 'text' : 'password'}
                                                />
                                                <span
                                                    className="position-absolute end-0 top-70 translate-middle-y me-2 cursor-pointer"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                            <div className="mt-2">
                                                <label
                                                    className="form-check-label text-muted fw-normal"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    I forgot my password
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-grid mt-4">
                                        <LinkButton to='/home' className='text-decoration-none secondary-button' text="Sign In" />
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
