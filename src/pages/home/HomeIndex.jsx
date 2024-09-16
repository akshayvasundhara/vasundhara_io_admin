
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaCodePullRequest } from "react-icons/fa6";
import { GiOffshorePlatform } from "react-icons/gi";
import { LuContact } from "react-icons/lu";
import { FaRegNewspaper } from "react-icons/fa";


function HomeIndex() {

    const data = [
        { id: 1, title: "Testimonial", icons: <FaUsers />, testimonialCount: 14, activeCount: 14 },
        { id: 2, title: "Portfolio", icons: <CgProfile />, testimonialCount: 25, activeCount: 20 },
        { id: 3, title: "Estimation Requests", icons: <FaCodePullRequest />, testimonialCount: 25, activeCount: 20 },
        { id: 4, title: "Offshore", icons: <GiOffshorePlatform />, testimonialCount: 25, activeCount: 20 },
        { id: 5, title: "Contact Us", icons: <LuContact />, testimonialCount: 25, activeCount: 20 },
        { id: 6, title: "Newsletter", icons: <FaRegNewspaper />, testimonialCount: 25, activeCount: 20 },
        // { id: 7, title: "Blogs", testimonialCount: 25, activeCount: 20 },
        // { id: 8, title: "Case Studies", testimonialCount: 25, activeCount: 20 },
        // Add more items as needed
    ];

    return (
        <>
            <Layout>
                <h2 className='page-title'>Dashboard</h2>
                <Row className='dashboard-cards font-family-poppins mt-4'>
                    {data.map((item) => (
                        <Col key={item.id} md={3}>
                            <Card className="text-center">
                                <Card.Body>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='cards-icon-box'>
                                            {item.icons}
                                        </div>
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='cards-bottom d-flex justify-content-between align-items-center w-100'>
                                            <div className='d-flex align-items-center gap-1'>
                                                <h5>Total :</h5>
                                                <span>{item.testimonialCount}</span>
                                            </div>
                                            <div className='d-flex align-items-center gap-1'>
                                                <h5>Active :</h5>
                                                <span>{item.activeCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Layout>
        </>
    )
}

export default HomeIndex
