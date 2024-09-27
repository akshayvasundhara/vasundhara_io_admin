
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Accordion } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import { Link } from 'react-router-dom';


function ViewCaseStudiesIndex() {
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
    const [isReadMore, setIsReadMore] = useState(true);
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum nec lacus nec scelerisque. Nullam vitae convallis enim. Suspendisse a mi justo. Aenean malesuada est eu arcu egestas, eget scelerisque arcu lobortis. Mauris sit amet risus varius, tincidunt felis sit amet, finibus nunc. Integer id feugiat lacus. Vivamus eget purus in justo volutpat aliquet a eget velit.`;

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/blogs-list' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>Case Studies Details</h2>
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
                                            <label>Subtitle:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                                        </div>
                                        <div>
                                            <label>Author:</label>
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
                                        <div>
                                            <label>Description:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                                        </div>
                                        <div>
                                            <label>Tags:</label>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
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
                                        <label className='mb-2'>Video:</label>
                                        <div className='d-flex flex-wrap gap-3 mb-3'>
                                            <div className='border rounded-3 p-1'>
                                                <video autoplay="" loop="" controls="" width="150" height="150">
                                                    <source type="video/mp4" src="https://endtest-videos.s3-us-west-2.amazonaws.com/documentation/endtest_data_driven_testing_csv.mp4" />
                                                </video>
                                            </div>
                                        </div>
                                        <h5 className='form-title'>Industry</h5>
                                        <div className="career-flight section-py mt-2 mb-3">
                                            <div className="row g-3">
                                                {careerDetails.map(detail => (
                                                    <div className="col-12 col-md-6 col-xl-4" key={detail.id}>
                                                        <div className="card h-100 border-0 shadow-lg">
                                                            <div className="career-details card-body">
                                                                <div className="career-icon" aria-label={detail.title}>
                                                                    <img src={detail.imageUrl} alt={detail.title} width={90} height={90} /> {/* Adjust size as needed */}
                                                                </div>
                                                                <h4>{detail.title}</h4>
                                                                <p>{detail.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>


                                        <h5 className='form-title'>Features</h5>
                                        <div className="career-flight section-py mt-2 mb-3">
                                            <div className="row g-3">
                                                {careerDetails.map(detail => (
                                                    <div className="col-12 col-md-6 col-xl-4" key={detail.id}>
                                                        <div className="card h-100 border-0 shadow-lg">
                                                            <div className="career-details card-body">
                                                                <div className="career-icon" aria-label={detail.title}>
                                                                    <img src={detail.imageUrl} alt={detail.title} width={90} height={90} /> {/* Adjust size as needed */}
                                                                </div>
                                                                <h4>{detail.title}</h4>
                                                                <p>{detail.description}</p>
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

                                        <h5 className='form-title'>Other Image</h5>
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



                                        <h5 className='form-title'>Content</h5>

                                        <div className="career-flight section-py mt-2 mb-3">
                                            <div className="row g-3">
                                                {careerDetails.map(detail => (
                                                    <div className="col-12 col-md-6 col-xl-4" key={detail.id}>
                                                        <div className="card h-100 shadow-lg career-details">
                                                            <div className="card-body p-0">
                                                                <div className="career-icon" aria-label={detail.title}>
                                                                    <img src={detail.imageUrl} alt={detail.title} width={90} height={90} /> {/* Adjust size as needed */}
                                                                </div>
                                                                <h4>{detail.title}</h4>
                                                                {/* <p>{detail.description}</p> */}
                                                                {isReadMore ? text.slice(0, 100) : text}
                                                                <p onClick={toggleReadMore} style={{ color: "blue", cursor: "pointer" }}>
                                                                    {isReadMore ? " ...Read More" : " Read Less"}
                                                                </p>
                                                            </div>
                                                            <div className="card-footer bg-transparent border-0 px-0">
                                                                <Link className='mt-2 text-decoration-none' to={detail.to}>{detail.to}</Link>

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <h5 className='form-title mt-4 mb-3'>Faqs</h5>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                                <Accordion.Body className='border-top'>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                                <Accordion.Body className='border-top'>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
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

export default ViewCaseStudiesIndex
