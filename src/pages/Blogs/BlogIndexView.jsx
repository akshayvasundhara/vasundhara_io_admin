
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";


function BlogIndexView() {

    const names = [
        { label: 'Title:', value: 'title:' },
        { label: 'Category:', value: 'Category' },
        { label: 'Date:', value: '23-09-2024' },
        { label: 'Author:', value: 'Author' },
        { label: 'View:', value: '100' },
        { label: 'Likes:', value: '500' },
        { label: 'Blog Read Time:(In minutes)', value: '123' },
        { label: 'Status:', value: 'On' },
        { label: 'Featured:', value: 'Off' },
        { label: 'Trending:', value: 'On' },
        { label: 'Description:', value: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, unde, officia molestias fuga error voluptatum necessitatibus deleniti consequatur voluptas harum quod assumenda corrupti quis soluta aspernatur dolores quisquam eligendi quidem.' },
        { label: 'Main Content:', value: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, unde, officia molestias fuga error voluptatum necessitatibus deleniti consequatur voluptas harum quod assumenda corrupti quis soluta aspernatur dolores quisquam eligendi quidem.' },
        { label: 'Head Tags By SEO:', value: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, unde, officia molestias fuga error voluptatum necessitatibus deleniti consequatur voluptas harum quod assumenda corrupti quis soluta aspernatur dolores quisquam eligendi quidem.' },
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
                                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
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
