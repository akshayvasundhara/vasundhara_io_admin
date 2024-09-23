
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import Textarea from '../../components/comman/Textarea';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import SelectInput from '../../components/comman/SelectInput';


function FaqsAdd() {

    const option = [
        { value: '1', label: 'Application Development' },
        { value: '2', label: 'Website Development' },
        { value: '3', label: 'Game Development' },
        { value: '4', label: 'Billing' },
        { value: '5', label: 'About Services' },
    ];


    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/faqs' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Add Faqs</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <form action="">
                                        <Row className='g-3'>
                                            <Col md={6}>
                                                <Textarea label="Question:" rows="4" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>
                                            <Col md={6}>
                                                <Textarea label="Answer:" rows="4" type="text" name="description" />
                                                {/* <SingleError error={errors?.description} /> */}
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput label="Type:" options={option} />
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

export default FaqsAdd
