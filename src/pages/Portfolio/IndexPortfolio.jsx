
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import DeleteButton from '../../components/comman/DeleteButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';
import Switch from '../../components/comman/Switch';
import ViewButton from '../../components/comman/ViewButton';
import EditButton from '../../components/comman/EditButton';
import LinkButton from '../../components/comman/LinkButton';


function IndexPortfolio() {
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
                    <h2 className='page-title'>Portfolio</h2>
                    <LinkButton text="Add" to='/portfolio-add' className='secondary-button text-decoration-none px-4' />
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <div className='overflow-auto'>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th width="50px">No.</th>
                                                    <th width="100px">Icon</th>
                                                    <th>Title</th>
                                                    <th>Category</th>
                                                    <th>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>
                                                        <div className='table-image'>
                                                            <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" className='w-100 h-100' alt="" />
                                                        </div>
                                                    </td>
                                                    <td><p>Food Delivery Application</p></td>
                                                    <td><p>Emely Cooper</p></td>
                                                    <td>
                                                        <Switch />
                                                    </td>
                                                    <td width={100}>
                                                        <div className='d-flex align-items-center gap-2'>
                                                            <ViewButton to='/portfolio-view' />
                                                            <EditButton to='/portfolio-edit' />
                                                            <DeleteButton />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
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

export default IndexPortfolio

