
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
import MyEditor from '../../components/comman/MyEditor';


function AddBlogList() {

    // State to track the dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to handle the toggle switch
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const option = [
        { value: '1', label: 'Select Category' },
        { value: '2', label: 'Category 1' },
        { value: '3', label: 'Category 2' },
        { value: '4', label: 'Category 3' },
        { value: '5', label: 'Category 4' },
        { value: '6', label: 'Category 5' },
    ];

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/teams' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Add Blog</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <form action="">
                                        <Row className='g-4'>
                                            <Col md={6}>
                                                <LableInput
                                                    label="Title:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter title"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput label="Category:" options={option} />
                                            </Col>
                                            <Col md={6}>
                                                <LableInput
                                                    label="Date:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter date"
                                                    type="date"
                                                    name='date'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput label="Author:" options={option} />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="View:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter view"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>

                                            <Col md={4}>
                                                <LableInput
                                                    label="Likes:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter likes"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="Blog Read Time:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter blog read time (In minutes)"
                                                    type="text"
                                                    name='email'
                                                // value={values?.email || ""}
                                                // onKeyPress={handleKeyPress}
                                                // onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={6} className='switch-box'>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Status:
                                                    </label>
                                                    <Switch />
                                                </div>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Featured:
                                                    </label>
                                                    <Switch />
                                                </div>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Trending:
                                                    </label>
                                                    <Switch />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <FileInput label="Image:" />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Textarea label="Description:" rows="9" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>
                                            <Col md={12}>
                                                <label htmlFor="industry-select" className="form-label text-default">
                                                    Main Content:
                                                </label>
                                                <MyEditor />
                                            </Col>

                                            <Col md={12}>
                                                <Textarea label="Head Tags By SEO:" rows="9" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>

                                        </Row>
                                    </form>

                                    <div className="d-flex justify-content-between align-items-center mt-5">
                                        <div></div>
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

export default AddBlogList
