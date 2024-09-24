
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import DeleteButton from '../../components/comman/DeleteButton';
import ViewButton from '../../components/comman/ViewButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';
import NoDataAvailable from '../../components/comman/NoDataAvailable';


function ContactUsIndex() {

    const serverURL = getServerURL();
    const [contact, setContact] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    // Get Contact us 
    const getContacts = async () => {
        setMainLoader(true);
        try {
            const response = await api.getWithToken(`${serverURL}/contact-us?perPage=${limit}&page=${page}`)
            if (response.data.success === true) {
                setContact(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setCurrentPage(response?.data?.data.page);
            } else {
                setContact([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getContacts();
    }, [page, limit])


    // Delete function
    const onSuccessData = () => {
        if (contact.data.length === 1 && page > 1) {
            setPage(currentPage - 1);
        } else {
            getContacts(limit, page);
        }
    }
    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Contact Us</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                <div className='overflow-x-auto'>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th width="50px">No.</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Country</th>
                                                <th width='100'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contact?.data?.length > 0 ? (
                                                contact?.data?.map((test, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{(page - 1) * limit + index + 1}.</td>
                                                            <td><p>{test.full_name}</p></td>
                                                            <td><p>{test.last_name}</p></td>
                                                            <td><p>{test.email}</p></td>
                                                            <td><p>{test.phone}</p></td>
                                                            <td><p>{test.country}</p></td>
                                                            <td width={100}>
                                                                <div className='d-flex align-items-center gap-2'>
                                                                    <ViewButton to='/contact-us-view' state={test} />
                                                                    <DeleteButton id={test._id}
                                                                        endpoint={`${serverURL}/contact-us`}
                                                                        onSuccess={onSuccessData} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                   <td colSpan="7"><NoDataAvailable /></td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </Table>
                                    </div>
                                    {paginationData > 1 && (
                                        <CommanPagination
                                            currentPage={currentPage}
                                            totalPages={paginationData}
                                            onPageChange={(newPage) => {
                                                setPage(newPage);
                                            }}
                                        />
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </Layout >
        </>
    )
}

export default ContactUsIndex

