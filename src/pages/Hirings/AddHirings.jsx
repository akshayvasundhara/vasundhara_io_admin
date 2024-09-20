
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
import SelectInput from '../../components/comman/SelectInput';
import PlushLableInput from '../../components/comman/PlushLableInput';


function AddHirings() {

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
                    <h2 className='page-title'>Add Hirings</h2>
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
                                                    label="Job Name:"
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
                                                    label="Experience:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter experience"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <LableInput
                                                    label="Qualification:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter qualification"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput label="Job Time:" options={option} />
                                            </Col>
                                            <Col md={6}>
                                                <PlushLableInput
                                                    label="Location:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter responsibilities"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <LableInput
                                                    label="No. of Openings:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter no of openings"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <PlushLableInput
                                                    label="Responsibilities:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter responsibilities"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <PlushLableInput
                                                    label="Skill:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter responsibilities"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <FileInput label="Icon:" />
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

export default AddHirings
