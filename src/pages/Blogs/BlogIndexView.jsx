import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import { Row, Col, Card, Accordion } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import { ImArrowLeft } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import { getImageURL } from '../../helper/envConfig';
import { FaCheckCircle, FaClipboard } from 'react-icons/fa';

function BlogIndexView() {
    const location = useLocation();
    const state = location.state || {};
    const imageURL = getImageURL();

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            figure img {
                width: 100%;
                height: 100%;
            }
            p {
                word-break: break-all;
                font-size: 15px;
            }
                b,
strong {
  color: black
}

            blockquote {
                border-left: 5px solid #ccc;
                font-style: italic;
                margin-left: 0;
                margin-right: 0;
                overflow: hidden;
                padding-left: 1.5em;
                padding-right: 1.5em;
            }
            h1, h2, h3, h4, h5, h6 {
                margin-top: 15px;
            }
            body::-webkit-scrollbar {
                display: none;
            }
        </style>
    </head>
    <body>
        %CONTENT%
    </body>
    </html>
    `;
    const finalContentBenefit = htmlTemplate.replace('%CONTENT%', state.main_content || '');

    const names = [
        { label: 'Title:', value: state.title || '' },
        { label: 'Category:', value: state.category?.name || '' },
        { label: 'Date:', value: state.date ? new Date(state.date).toISOString().split("T")[0] : "" },
        { label: 'Author:', value: state.author?.name || '' },
        { label: 'View:', value: state.views || '' },
        { label: 'Likes:', value: state.likes || '' },
        { label: 'Blog Read Time:(In minutes)', value: state.blog_read_time || '' },
        { label: 'Status:', value: state.status === 1 ? 'On' : 'Off' },
        { label: 'Featured:', value: state.isFeatured === 1 ? 'On' : 'Off' },
        { label: 'Trending:', value: state.isTrending === 1 ? 'On' : 'Off' },
        { label: 'Content:', value: state.content || '' },
        // { label: 'Head Tags By SEO:', value: state.seo || '' },
    ];

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        const fullURL = imageURL + state.image;
        navigator?.clipboard?.writeText(fullURL)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error("Error copying URL: ", err);
            });
    };

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
                                    <div className='col-sm-12 col-md-4'>
                                        <label htmlFor="">{"Image URL:"}</label>
                                        <div className='d-flex justify-content-between mb-3 border rounded-2 mt-2'>
                                            <p className="image-url-text mb-0 py-2 px-2">{imageURL + state.image}</p>
                                            <div className='border-start'>
                                                <button
                                                    className="copy-btn h-100 rounded-0"
                                                    onClick={() => handleCopy()}
                                                    title="Copy to clipboard"
                                                >
                                                    {isCopied ? (
                                                        <FaCheckCircle className="success-icon" />
                                                    ) : (
                                                        <FaClipboard className="copy-icon" />
                                                    )}
                                                    {/* {isCopied ? 'Copied!' : 'Copy URL'} */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {names.map((item, index) => (
                                            <div key={index}>
                                                <label htmlFor="">{item.label}</label>
                                                <p>{item.value}</p>
                                            </div>
                                        ))}
                                        {/* Render the Main Content separately */}
                                        <div>
                                            <label>Head Tags By SEO:</label>
                                            <div className='border p-3 mt-2 mb-3 rounded-2 table_content'>
                                                <p>{state.seo}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label>Table of Content:</label>
                                            {/* <div
                                                dangerouslySetInnerHTML={{ __html: finalContentBenefit }}
                                            /> */}
                                            <div className='border p-3 mt-2 mb-3 rounded-2 table_content'>
                                                <span dangerouslySetInnerHTML={{ __html: state?.table_content || "-" }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label>Main Content:</label>
                                            {/* <div
                                                dangerouslySetInnerHTML={{ __html: finalContentBenefit }}
                                            /> */}
                                            <div className='border p-3 mt-2 mb-3 rounded-2'>
                                                <span dangerouslySetInnerHTML={{ __html: state?.main_content || "-" }} />
                                            </div>
                                        </div>
                                    </div>

                                    <label className='mb-3' htmlFor="">{"Faqs:"}</label>
                                    <Accordion>
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
                                    </Accordion>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </>
    );
}

export default BlogIndexView;
