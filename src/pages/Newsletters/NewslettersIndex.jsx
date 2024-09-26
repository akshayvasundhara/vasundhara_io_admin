
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import DeleteButton from '../../components/comman/DeleteButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import NoDataAvailable from '../../components/comman/NoDataAvailable';
import LoaderComman from '../../components/comman/LoaderComman';


function NewslettersIndex() {
    const serverURL = getServerURL();
    const [newsLetter, setNewsLetter] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);



    // Get News Letter
    const getNewsLetter = async () => {
        setMainLoader(true);
        try {

            const response = await api.getWithToken(`${serverURL}/newsletters?perPage=${limit}&page=${page}`)
            if (response.data.success === true) {
                setNewsLetter(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setPage(response?.data?.data.page);
            } else {
                setNewsLetter([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getNewsLetter();
    }, [page, limit])


    // Delete function
    const onSuccessData = () => {
        if (newsLetter.data.length === 1 && page > 1) {
            setPage(page - 1);
        } else {
            getNewsLetter(limit, page);
        }
    }


    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Newsletters</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Table responsive="lg">
                                        <thead>
                                            <tr>
                                                <th width="50px">No.</th>
                                                <th>Email</th>
                                                <th width='100'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsLetter?.data?.length > 0 ? (
                                                newsLetter?.data?.map((test, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{(page - 1) * limit + index + 1}.</td>
                                                            <td><p>{test.email}</p></td>
                                                            <td width={100}>
                                                                <div className='d-flex align-items-center gap-2 ms-2'>
                                                                    <DeleteButton id={test._id}
                                                                        endpoint={`${serverURL}/newsletters`}
                                                                        onSuccess={onSuccessData}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="6"><NoDataAvailable /></td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </Table>
                                    {paginationData > 1 && (
                                        <CommanPagination
                                            currentPage={page}
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

export default NewslettersIndex

