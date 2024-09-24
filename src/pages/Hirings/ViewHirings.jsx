
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import { ImArrowLeft } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { getImageURL } from '../../helper/envConfig';
import formatDate from '../../helper/formatDate';



function ViewHirings() {
    const location = useLocation();
    const state = location.state || {};

    // State to track the dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);
    const imageURL = getImageURL();
    // Function to handle the toggle switch
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };
    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/hirings' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Hirings Details</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <div className="row g-2 details-box">
                                        <div className="col-sm-12">
                                            <div className='view-image-box mb-2'>
                                                <img
                                                    src={`${imageURL}${state.image}`}
                                                    alt=""
                                                    className='w-100 h-100'
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="job_name">Job Name:</label>
                                            <p>{state.job_name}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="experience">Experience:</label>
                                            <p>{state.experience} Year</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="no">No. of Openings:</label>
                                            <p>{state.no_of_openings}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="qualification">Job Time:</label>
                                            <p>Full Time</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="qualification">Qualification:</label>
                                            <p>{state.qualification}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="location" className="form-label text-default fw-600">Location:</label>
                                            {state.location.map((loc, index) => (
                                                <li key={index}>
                                                    <span>{loc}</span>
                                                </li>
                                            ))}
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="responsibilities">Responsibilities:</label>
                                            <ul className='ps-2 list-unstyled responsibilities pt-2'>
                                                {state.responsibilities.map((responsibility, index) => (
                                                    <li key={index}>
                                                        <FaCheckCircle />
                                                        <span>{responsibility}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p />
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="responsibilities">Skill:</label>
                                            <ul className='ps-2 list-unstyled responsibilities pt-2'>
                                                {state.skill.map((skills, index) => (
                                                    <li key={index}>
                                                        <FaCheckCircle />
                                                        <span>{skills}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <p />
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="status">Status:</label>
                                            <p>
                                                {state.status === 1 ? 'Activate' : 'Deactivate'}
                                            </p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="created_at">Created At:</label>
                                            <p>{formatDate(state.createdAt)}</p>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div >
            </Layout >
        </>
    )
}

export default ViewHirings
