
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import LableInput from '../../components/comman/LableInput';
import Textarea from '../../components/comman/Textarea';
import FileInput from '../../components/comman/FileInput';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";


function TeamsAdd() {

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
                    <LinkButton text={<ImArrowLeft />} to='/teams' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Add Teams</h2>
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
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <LableInput
                                                    label="Designation:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter designation"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <Textarea label="Description:" rows="9" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>
                                            <Col md={6}>
                                                <FileInput label="Icon:" />
                                            </Col>
                                            <Col md={6}>
                                                <Textarea label="Linkedin:" rows="4" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>
                                            <Col md={6}>
                                                <Textarea label="Twitter:" rows="4" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>
                                            <Col md={6}>
                                                <Textarea label="Facebook:" rows="4" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>
                                        </Row>
                                    </form>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div className='d-flex align-items-center gap-2'>
                                            <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                Status:
                                            </label>
                                            <Switch />
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <CommanButton className="save-btn" text="Save" />
                                            <CommanButton className="cancel-btn" text="Cancel" />
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
