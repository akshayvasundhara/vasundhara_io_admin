
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table, Pagination } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import DeleteButton from '../../components/comman/DeleteButton';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';
import ViewButton from '../../components/comman/ViewButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';
import { toast } from 'react-toastify';


function HiringIndex() {
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [hiring, setHiring] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    // Get Hiring
    const getHiring = async () => {
        setMainLoader(true);
        try {
            const response = await api.getWithToken(`${serverURL}/hiring?perPage=${limit}&page=${page}`)
            if (response.data.success === true) {
                setHiring(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setCurrentPage(response?.data?.data.page);
            } else {
                setHiring([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getHiring();
    }, [page, limit])


    // Delete function
    const onSuccessData = () => {
        if (hiring.length === 1 && page > 1) {
            setCurrentPage(currentPage - 1)
        } else {
            getHiring(limit, page)
        }
    }

    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/hiring/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getHiring(); // Refresh hiring data after updating
            } else {
                console.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            {mainLoader ? (
                <LoaderComman />
            ) : (
                <Layout>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className='page-title'>Hirings</h2>
                        <LinkButton text="Add" to='/hirings-add' className='secondary-button text-decoration-none px-4' />
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
                                                    <th>Icon</th>
                                                    <th>Job Name</th>
                                                    <th>Experience</th>
                                                    <th>Qualification</th>
                                                    <th>Job Time</th>
                                                    <th>No. of Openings	</th>
                                                    <th>Location</th>
                                                    <th width='100'>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            {hiring.data?.length > 0 ? (
                                                hiring?.data?.map((test, index) => {
                                                    return (
                                                        <tbody>
                                                            <tr key={index}>
                                                                <td>{(page - 1) * limit + index + 1}.</td>
                                                                <td>
                                                                    <div className='table-image'>
                                                                        <img src={`${imageURL}${test.image}`} alt="" className='w-100 h-100' />
                                                                    </div>
                                                                </td>
                                                                <td>{test.job_name}</td>
                                                                <td>{test.experience}</td>
                                                                <td>{test.qualification}</td>
                                                                <td>Full Time</td>
                                                                <td>{test.no_of_openings}</td>
                                                                <td>
                                                                    {test.location.map((loc, index) => (
                                                                        <span key={index}>
                                                                            {loc}
                                                                            {index < test.location.length - 1 && ', '}
                                                                        </span>
                                                                    ))}
                                                                </td>
                                                                <td>
                                                                    <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                                </td>
                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <ViewButton to='/hirings-view' state={test} />
                                                                        <EditButton to='/hirings-edit' state={test} />
                                                                        <DeleteButton id={test._id}
                                                                            endpoint={`${serverURL}/hiring`}
                                                                            onSuccess={onSuccessData} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })

                                            ) : (
                                                <tr>
                                                    <td colSpan="6">No data available</td>
                                                </tr>
                                            )}

                                        </Table>

                                        <CommanPagination />
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                    </div>

                    <div className="d-md-flex justify-content-end align-items-center mt-4 mb-4">
                        {paginationData > 1 && (
                            <CommanPagination
                                currentPage={currentPage}
                                totalPages={paginationData}
                                onPageChange={(newPage) => {
                                    setPage(newPage);
                                }}
                            />
                        )}
                    </div>
                </Layout >
            )}

        </>
    )
}

export default HiringIndex
