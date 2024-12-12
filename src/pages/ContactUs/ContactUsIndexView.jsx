
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import LableInput from '../../components/comman/LableInput';
import SelectInput from '../../components/comman/SelectInput';
import Textarea from '../../components/comman/Textarea';
import { useLocation } from 'react-router-dom';


function ContactUsIndexView() {
    const location = useLocation();
    const state = location.state || {};

    const names = [
        { label: 'First Name:', value: state.first_name || '' },
        { label: 'Last Name:', value: state.last_name || '' },
        { label: 'Email:', value: state.email || '' },
        { label: 'Mobile:', value: state.phone || '' },
        { label: 'Service:', value: state.service || '' },
        { label: 'Country:', value: state.country || '' },
        { label: 'Message:', value: state.message || '' },
    ];

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/contact-us' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Contact Us Details</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body className='details-box'>
                                    <div>
                                        {names.map((item, index) => (
                                            <div key={index}>
                                                <label htmlFor="">{item.label}</label>
                                                <p>{item.value}</p>
                                            </div>
                                        ))}
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

export default ContactUsIndexView
