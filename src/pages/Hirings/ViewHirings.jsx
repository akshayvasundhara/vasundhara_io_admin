
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import { ImArrowLeft } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";



function ViewHirings() {

    // State to track the dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to handle the toggle switch
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const option = [
        { value: '1', label: 'Full Time' },
        { value: '2', label: 'Half Time' },
    ];

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
                                    <div className="row g-2">
                                        <div className="col-sm-12">
                                            <div className='view-image-box mb-2'>
                                                <img
                                                    src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                                                    alt=""
                                                    className='w-100 h-100'
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="job_name" className="form-label text-default fw-600">Job Name:</label>
                                            <span className='ps-2'>Office Assistant</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="experience" className="form-label text-default fw-600">Experience:</label>
                                            <span className='ps-2'>0-1 Year</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="no" className="form-label text-default fw-600">No. of Openings:</label>
                                            <span className='ps-2'>1</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="qualification" className="form-label text-default fw-600">Job Time:</label>
                                            <span className='ps-2'>Full Time</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="qualification" className="form-label text-default fw-600">Qualification:</label>
                                            <span className='ps-2'>Any</span>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="location" className="form-label text-default fw-600">Location:</label>
                                            <li>Surat, Gujarat</li>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="responsibilities" className="form-label text-default fw-600">Responsibilities:</label>
                                            <ul className='ps-2 list-unstyled responsibilities'>
                                                <li> <FaCheckCircle /><span>Monitoring the use of equipment and supplies within the office.</span></li>
                                                <li> <FaCheckCircle /><span>Dealing with queries or requests from the visitors and employees.</span></li>
                                                <li> <FaCheckCircle /><span>Coordinating the maintenance and repair of office equipment.</span></li>
                                                <li> <FaCheckCircle /><span>Assisting other administrative staff in wide range of office duties.</span></li>
                                                <li> <FaCheckCircle /><span>Collecting and distributing couriers or parcels among employees and
                                                    opening and sorting emails.</span></li>
                                                <li> <FaCheckCircle /><span>Cooperating with office staff to maintain proper interaction and a
                                                    friendly environment within the office.</span></li>
                                                <li> <FaCheckCircle /><span>Make sure the office premise is clean.</span></li>
                                            </ul>
                                            <p />
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="responsibilities" className="form-label text-default fw-600">Skill:</label>
                                            <ul className='ps-2 list-unstyled responsibilities'>
                                                <li> <FaCheckCircle /><span>Monitoring the use of equipment and supplies within the office.</span></li>
                                                <li> <FaCheckCircle /><span>Dealing with queries or requests from the visitors and employees.</span></li>
                                                <li> <FaCheckCircle /><span>Coordinating the maintenance and repair of office equipment.</span></li>
                                                <li> <FaCheckCircle /><span>Assisting other administrative staff in wide range of office duties.</span></li>
                                                <li> <FaCheckCircle /><span>Collecting and distributing couriers or parcels among employees and
                                                    opening and sorting emails.</span></li>
                                                <li> <FaCheckCircle /><span>Cooperating with office staff to maintain proper interaction and a
                                                    friendly environment within the office.</span></li>
                                                <li> <FaCheckCircle /><span>Make sure the office premise is clean.</span></li>
                                            </ul>
                                            <p />
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="status" className="form-label text-default fw-600">Status:</label>
                                            <span className='ps-2'>
                                                Deactivate
                                            </span>
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="created_at" className="form-label text-default fw-600">Created At:</label>
                                            <span className='ps-2'>September 20, 2024</span>
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
