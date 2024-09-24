
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


function ContactUsIndexView() {

    const option = [
        { value: '1', label: 'Application Development' },
        { value: '2', label: 'Website Development' },
        { value: '3', label: 'Game Development' },
        { value: '4', label: 'Billing' },
        { value: '5', label: 'About Services' },
    ];

    const names = [
        { label: 'First Name:', value: 'Jhon' },
        { label: 'Last Name:', value: 'Doe' },
        { label: 'Email:', value: 'test@eaxmple.com' },
        { label: 'Mobile:', value: '+919922610389' },
        { label: 'Service:', value: 'art & animation' },
        { label: 'Country:', value: 'Surat, Gujarat' },
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
