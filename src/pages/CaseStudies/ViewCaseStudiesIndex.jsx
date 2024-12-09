
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Accordion } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import { Link, useLocation } from 'react-router-dom';
import { getImageURL, getServerURL } from '../../helper/envConfig';

function ViewCaseStudiesIndex() {
    const location = useLocation();
    const state = location.state || {};

    const imageURL = getImageURL();

    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const renderTextWithList = (text) => {
        const lines = text.split('\n');
        const formattedLines = lines.map((line, index) => {
            if (line.startsWith('- ')) {
                return <li key={index}>{line.slice(2)}</li>;
            }
            return <span key={index}>{line}</span>;
        });
        return formattedLines;
    };

    return (
        <>
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/case-studies' className='back-btn d-flex justify-content-center align-items-center' />
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
                                            <p>{state.title}</p>
                                        </div>
                                        <div>
                                            <label>Subtitle:</label>
                                            <p>{state?.sub_title}</p>
                                        </div>
                                        <div>
                                            <label>Google Play Store:</label>
                                            <p><Link>{state.play_store_link}</Link></p>
                                        </div>
                                        <div>
                                            <label>App Store:</label>
                                            <p><Link>{state.app_store_link}</Link></p>
                                        </div>
                                        <div>
                                            <label>Description:</label>
                                            <p>{state.desc}</p>
                                        </div>
                                        <div>
                                            <label>Tags:</label>
                                            <p>{state.tags?.map((t, index) => {
                                                return <span key={index}>
                                                    {t}
                                                    {index < state.tags.length - 1 && ', '}
                                                </span>;
                                            })}</p>
                                        </div>
                                        <label className='mb-2'>Banner:</label>
                                        <div className='d-flex gap-3 flex-wrap'>
                                            <div>
                                                <div className='view-image-box mb-3'>
                                                    <img
                                                        src={`${imageURL}${state.image}`}
                                                        alt=""
                                                        className='w-100 h-100'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {state?.video && (
                                            <>
                                                <label className='mb-2'>Video:</label>
                                                <div className='d-flex flex-wrap gap-3 mb-3'>
                                                    <div className='border rounded-3 p-1'>
                                                        <video autoplay="" loop="" controls="" width="240" height="240">
                                                            <source type="video/mp4" src={`${imageURL}${state.video}`} />
                                                        </video>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <h5 className='form-title pt-3'>Details:</h5>

                                        <div>
                                            {state?.details.map((item) => (
                                                <>
                                                    <div>
                                                        <label>{item?.key}</label>
                                                        <p>{item?.value}</p>
                                                    </div>
                                                </>
                                            ))}
                                        </div>

                                        <h5 className='form-title pt-3'>Process:</h5>

                                        <div className='row studies_details_cards mb-3 g-3'>
                                            {state?.process.map((item) => (
                                                <div className='col-12 col-md-6 col-xl-3' key={item._id}>
                                                    <div className='card'>
                                                        <div className="card-body">
                                                            <div className='d-flex align-items-center gap-3'>
                                                                <div className='process_icons d-flex justify-content-center align-items-center'>
                                                                    <img
                                                                        src={`${imageURL}${item.image}`}
                                                                        width={30}
                                                                        height={30}
                                                                        alt={item.title}
                                                                    />
                                                                </div>
                                                                <h4 className='mb-0'>{item?.title}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <h5 className='form-title pt-3'>Solution</h5>
                                        <div>
                                            <label>Solution main title</label>
                                            <p>{state?.solution_main_title}</p>
                                        </div>
                                        <div className='row studies_details_cards my-3 g-3'>
                                            {state?.solution.map((item) => (
                                                <div className="col-3 col-md-6 col-lg-6 col-xl-3">
                                                    <div className="card rounded-2">
                                                        <div className="card-body">
                                                            <div key={item?._id}>
                                                                <h4>{item.title}</h4>
                                                                <p>{item.desc}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <h5 className='form-title pt-3'>Technology:</h5>
                                        <p>{state?.technology?.title}</p>

                                        <div style={{ marginTop: '20px' }}>
                                            <label>Technologies name:</label>
                                            <ul className='technologies_name'>
                                                {state?.technology?.tech.map((technology, index) => (
                                                    <li key={index}>
                                                        {technology}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <h5 className='form-title pt-3'>Client Feedback</h5>
                                        <div>
                                            <label>Client Image</label>
                                            <p>
                                                <img src={imageURL + state?.client?.image} alt="Client Image" width={100} height={100} />
                                            </p>
                                        </div>
                                        <div>
                                            <label>Name</label>
                                            <p>{state?.client?.name}</p>
                                        </div>
                                        <div>
                                            <label>Designation</label>
                                            <p>{state?.client?.designation}</p>
                                        </div>
                                        <div>
                                            <label>Feedback</label>
                                            <p>{state?.client?.feedback}</p>
                                        </div>

                                        {/* <h5 className='form-title pt-3'>Industry:</h5> */}
                                        {/* <div className="career-flight section-py mt-2 mb-3">
                                            <div className="row g-3">
                                                {state?.industry?.map(detail => (
                                                    <div className="col-12 col-md-6 col-xl-4" key={detail.id}>
                                                        <div className="card h-100 border-0 shadow-lg">
                                                            <div className="career-details card-body">
                                                                <div className="career-icon" aria-label={detail.title}>
                                                                    <img src={`${imageURL}${detail.image}`} alt={detail.title} />
                                                                </div>
                                                                <h4>{detail.title}</h4>
                                                                <p>{detail.desc}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div> */}


                                        {/* <h5 className='form-title pt-3'>Features:</h5> */}
                                        {/* <div className="career-flight section-py mt-2 mb-3">
                                            <div className="row g-3">
                                                {state.features.map(detail => (
                                                    <div className="col-12 col-md-6 col-xl-4" key={detail.id}>
                                                        <div className="card h-100 border-0 shadow-lg">
                                                            <div className="career-details card-body">
                                                                <div className="career-icon" aria-label={detail.title}>
                                                                    <img src={`${imageURL}${detail.image}`} alt={detail.title} width={90} height={90} /> 
                                                                </div>
                                                                <h4>{detail.title}</h4>
                                                                <p>{detail.desc}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div> */}

                                        {/* <section className="key-features latest-innovations section-py">
                                            <div className="container">
                                                <Row className="g-md-4 g-2">
                                                    {state.features.map(detail => (
                                                        <Col lg={3} sm={4} xs={6} key={detail.id}>
                                                            <div className="innovations-card" style={{ backgroundImage: `url(${imageURL}${detail.image} || '-'})` }}>
                                                                <div className="innovations-detail">
                                                                    <h4>{detail.title}</h4>
                                                                    <p>{detail.desc}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
                                        </section> */}

                                        {/* <section className="key-features latest-innovations section-py">
                                            <Row className="g-md-4 g-2 row-cols-1 row-cols-lg-3 row-cols-xl-5">
                                                {state?.features?.map(detail => (
                                                    <Col key={detail.id}>
                                                        <div
                                                            className="innovations-card"
                                                            style={{
                                                                backgroundImage: `url(${detail.image ? `${imageURL}${detail.image}` : 'path/to/fallback-image.jpg'})`,
                                                            }}
                                                        >
                                                            <div className="innovations-detail">
                                                                <p>{detail.title}</p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </section> */}

                                        {/* <h5 className='form-title pt-3'>Sample Screens:</h5> */}
                                        {/* <div className='d-flex gap-3 flex-wrap'>
                                            {state?.sample_screen_images?.length > 0 ? (
                                                state?.sample_screen_images?.map((sample, index) => {
                                                    return (
                                                        <div>
                                                            <div className='mb-3'>
                                                                <img
                                                                    src={`${imageURL}${sample.image}`}
                                                                    alt=""
                                                                    className='preview-image sample-screens-image'
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div>
                                                    <div className='view-image-box mb-3'>
                                                        <img
                                                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                            alt=""
                                                            className='w-100 h-100'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div> */}

                                        {/* <h5 className='form-title pt-3'>Other Image:</h5> */}
                                        {/* <div className='d-flex gap-3 flex-wrap'>

                                            {state?.other_images?.length > 0 ? (
                                                state?.other_images?.map((other, index) => {
                                                    return (
                                                        <div>
                                                            <div className='view-image-box mb-3'>
                                                                <img
                                                                    src={`${imageURL}${other.image}`}
                                                                    alt=""
                                                                    className='w-100 preview-image sample-screens-image'
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div>
                                                    <div className='view-image-box mb-3'>
                                                        <img
                                                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYkW08ALhub8QLhbnIlCWdSrEKaGyhMqjOsbVaEtvJcAszZaTIx48a--Zd7XBwQO4tbgw&usqp=CAU'
                                                            alt=""
                                                            className='w-100 preview-image sample-screens-image'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div> */}

                                        <h5 className='form-title pt-3'>Content:</h5>

                                        <div className="career-flight section-py mt-2 mb-3 mt-3">
                                            {state.content.map(detail => (
                                                <div className="card mb-4">
                                                    <div className="card-body">
                                                        <div className="row g-3 align-items-center" key={detail.id}>

                                                            <div className="col-12 col-md-12 col-lg-6 career-details order-2 order-lg-1">
                                                                <h4>{detail.title}</h4>
                                                                {/* {isReadMore ? detail.desc.slice(0, 100) : detail.desc} */}
                                                                {/* <p onClick={toggleReadMore} style={{ color: "blue", cursor: "pointer" }}>
                                                                    {isReadMore ? " ...Read More" : " Read Less"}
                                                                </p> */}
                                                                <p>
                                                                    {renderTextWithList(detail.desc)}
                                                                </p>
                                                            </div>
                                                            <div className='col-12 col-lg-6 order-1 order-lg-2' aria-label={detail.title}>
                                                                <img className='rounded-3 w-100 h-100' src={`${imageURL}${detail.image}`} alt={detail.title} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* <h5 className='form-title pt-3 mb-3'>Faqs:</h5> */}
                                        {/* <Accordion>
                                            {state?.faqs?.map((faq, index) => {
                                                return (
                                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                                        <Accordion.Header>{faq.question}</Accordion.Header>
                                                        <Accordion.Body className='border-top'>
                                                            {faq.answer}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            })}
                                        </Accordion> */}
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
