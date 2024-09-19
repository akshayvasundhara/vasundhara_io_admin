
import React, { useState } from 'react'
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




function AddTestimonials() {

    // State to track the dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to handle the toggle switch
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const option = [
        { value: '1', label: 'Android Development' },
        { value: '2', label: 'iOS Development' },
        { value: '3', label: 'Website Development' },
        { value: '4', label: 'Game Development' },
        { value: '5', label: 'UI/UX Design' },
        { value: '6', label: 'Character Design' },
        { value: '7', label: 'Logo Design' },
        { value: '8', label: 'Animation' },
        { value: '9', label: 'Scraping' },
    ];

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/testimonials' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Create Testimonial</h2>
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
                                                    label="Designation"
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
                                            {/* <Col md={6}>
                                                <SelectMultiple label="View On pages:" />
                                            </Col> */}
                                            <Col md={6}>
                                                <Textarea label="Description:" rows="9" />
                                            </Col>
                                            <Col md={6}>
                                                <FileInput label="Image:" />
                                            </Col>
                                        </Row>
                                    </form>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div className='d-flex align-items-center gap-2'>
                                            <label htmlFor="industry-select" className="form-label text-default">
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

export default AddTestimonials
