
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import DeleteButton from '../../components/comman/DeleteButton';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';
import CommanPagination from '../../components/comman/CommanPagination';
import { toast } from 'react-toastify';



function Testimonialsindex() {
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [testimonial, setTestimonial] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Get Testimonial
    const getTestimonials = async () => {
        setMainLoader(true);
        try {
            console.log("serverURL", serverURL);

            const response = await api.getWithToken(`${serverURL}/testimonial?perPage=${limit}&page=${page}`)
            if (response.data.success === true) {
                setTestimonial(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setCurrentPage(response?.data?.data.page);
            } else {
                setTestimonial([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getTestimonials();
    }, [page, limit])


    // Delete function
    const onSuccessData = () => {
        if (testimonial.data.length === 1 && page > 1) {
            setPage(currentPage - 1);
        } else {
            getTestimonials(limit, page);
        }
    }


    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/testimonial/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getTestimonials(); // Refresh hiring data after updating
            } else {
                toast.error("Failed to update status:", response.data.message);
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
                        <h2 className='page-title'>Testimonials</h2>
                        <LinkButton text="Add" to='/testimonials-add' className='secondary-button text-decoration-none px-4' />
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
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Designation</th>
                                                    <th width='100'>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {testimonial.data?.length > 0 ? (
                                                    testimonial?.data.map((test, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{(page - 1) * limit + index + 1}.</td>
                                                                <td>
                                                                    <div className='table-image'>
                                                                        <img src={`${imageURL}${test.image}`} alt="" className='w-100 h-100' />
                                                                    </div>
                                                                </td>
                                                                <td>{test.name}</td>
                                                                <td>{test.designation}</td>
                                                                <td>
                                                                    {/* <Switch mode={test.status} id={test._id} /> */}
                                                                    <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                                </td>
                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <EditButton to='/testimonials-edit' state={test} />
                                                                        <DeleteButton id={test._id}
                                                                            endpoint={`${serverURL}/testimonial`}
                                                                            onSuccess={onSuccessData}
                                                                        />
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
            )}
        </>
    )
}

export default Testimonialsindex
