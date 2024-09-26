
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import { getImageURL } from '../../helper/envConfig';


function BlogIndexView() {

    const location = useLocation();
    const state = location.state || {};
    const imageURL = getImageURL();

    const names = [
        { label: 'Title:', value: state.title || '' },
        { label: 'Category:', value: state.category.name || '' },
        { label: 'Date:', value: state.date ? new Date(state.date).toISOString().split("T")[0] : "", },
        { label: 'Author:', value: state.author.name || '' },
        { label: 'View:', value: state.views || '' },
        { label: 'Likes:', value: state.likes || '' },
        { label: 'Blog Read Time:(In minutes)', value: state.blog_read_time || '' },
        { label: 'Status:', value: state.status === 1 ? 'On' : 'Off' },
        { label: 'Featured:', value: state.isFeatured === 1 ? 'On' : 'Off' },
        { label: 'Trending:', value: state.isTrending === 1 ? 'On' : 'Off' },
        { label: 'Content:', value: state.content || '' },
        { label: 'Main Content:', value: state.main_content || '' },
        { label: 'Head Tags By SEO:', value: state.seo || '' },
    ];

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/blogs-list' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Blog Details</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body className='details-box'>
                                    <div className='view-image-box mb-3'>
                                        <img
                                            src={`${imageURL}${state.image}`}
                                            alt=""
                                            className='w-100 h-100'
                                        />
                                    </div>
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

export default BlogIndexView
