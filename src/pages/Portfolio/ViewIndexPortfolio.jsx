
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import { ImArrowLeft } from "react-icons/im";


function ViewIndexPortfolio() {
    const careerDetails = [
        {
            id: 1,
            title: "Growth-Focused",
            description: "We keep employee growth in mind, with each development step and project we take up.",
            imageUrl: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg", // Replace with the actual image path
            to: "Get A Free Demo",
        },
        {
            id: 2,
            title: "Team-Oriented",
            description: "Collaboration and teamwork are at the heart of what we do.",
            imageUrl: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg", // Replace with the actual image path
            to: "Get A Free Demo",
        },
        // You can add more career details here

    ];

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/portfolio' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Portfolio Details</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body className='details-box'>
                                    <div>

                                        <div>
                                            <label>Title:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                                        </div>
                                        <div>
                                            <label>Description:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                                        </div>
                                        <div>
                                            <label>Category:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                                        </div>
                                        <div>
                                            <label>Google Play Store:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                                        </div>
                                        <div>
                                            <label>App Store:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                                        </div>
                                        <label className='mb-2'>Icon:</label>
                                        <div className='d-flex gap-3 flex-wrap'>
                                            <div>
                                                <div className='view-image-box mb-3'>
                                                    <img
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                        alt=""
                                                        className='w-100 h-100'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <label className='mb-2'>Banner:</label>
                                        <div className='d-flex gap-3 flex-wrap'>
                                            <div>
                                                <div className='view-image-box mb-3'>
                                                    <img
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                        alt=""
                                                        className='w-100 h-100'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className='form-title'>Features</h5>
                                        <div className="career-flight section-py mt-2 mb-3">
                                            <div className="row g-3">
                                                {careerDetails.map(detail => (
                                                    <div className="col-12 col-md-6 col-xl-3" key={detail.id}>
                                                        <div className="card h-100 border-0 shadow-lg">
                                                            <div className="career-details card-body">
                                                                <div aria-label={detail.title}>
                                                                    <img src={detail.imageUrl} alt={detail.title} width={200} height={200} /> {/* Adjust size as needed */}
                                                                </div>
                                                                <h4>{detail.title}</h4>
                                                                {/* <p>{detail.description}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <h5 className='form-title'>Sample Screens</h5>
                                        <div className='d-flex gap-3 flex-wrap'>
                                            <div>
                                                <div className='view-image-box mb-3'>
                                                    <img
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                        alt=""
                                                        className='w-100 h-100'
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='view-image-box mb-3'>
                                                    <img
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                        alt=""
                                                        className='w-100 h-100'
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='view-image-box mb-3'>
                                                    <img
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                        alt=""
                                                        className='w-100 h-100'
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='view-image-box mb-3'>
                                                    <img
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                        alt=""
                                                        className='w-100 h-100'
                                                    />
                                                </div>
                                            </div>
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

export default ViewIndexPortfolio
