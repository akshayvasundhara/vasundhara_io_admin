
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import CommanPagination from '../../components/comman/CommanPagination';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';
import { getServerURL } from '../../helper/envConfig';
import { toast } from 'react-toastify';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';


function CategoriesIndex() {
    const serverURL = getServerURL();
    const [category, setCategory] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    // Get Category
    const getCategories = async () => {
        setMainLoader(true);
        try {
            console.log("serverURL", serverURL);

            const response = await api.getWithToken(`${serverURL}/blog-category?perPage=${limit}&page=${page}`)
            if (response.data.success === true) {
                setCategory(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setCurrentPage(response?.data?.data.page);
            } else {
                setCategory([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, [page, limit])



    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/testimonial/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getCategories(); // Refresh hiring data after updating
            } else {
                toast.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
    };


    return (
        <>

            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Category</h2>
                    <LinkButton text="Add" to='/categories-add' className='secondary-button text-decoration-none px-4' />
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
                                                <th>Name</th>
                                                <th width='100'>Status</th>
                                                <th width='100'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {category?.data?.length > 0 ? (
                                                category?.data?.map((test, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{(page - 1) * limit + index + 1}.</td>
                                                            <td>{test.name}</td>
                                                            <td>
                                                                <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                            </td>
                                                            <td width={100}>
                                                                <div className='d-flex align-items-center gap-2 ps-3'>
                                                                    <EditButton to='/categories-edit' state={test} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="6">No data available</td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </Table>
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

export default CategoriesIndex

