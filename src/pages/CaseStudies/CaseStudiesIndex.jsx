
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import DeleteButton from '../../components/comman/DeleteButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import NoDataAvailable from '../../components/comman/NoDataAvailable';
import LoaderComman from '../../components/comman/LoaderComman';
import Switch from '../../components/comman/Switch';
import ViewButton from '../../components/comman/ViewButton';
import EditButton from '../../components/comman/EditButton';
import LinkButton from '../../components/comman/LinkButton';
import { toast } from 'react-toastify';


function CaseStudiesIndex() {
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [caseStudy, setCaseStudy] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);



    // Get Case Study
    const getCaseStudy = async () => {
        setMainLoader(true);
        try {

            const response = await api.getWithToken(`${serverURL}/case-study?perPage=${limit}&page=${page}`)
            if (response.data.success === true) {
                setCaseStudy(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setPage(response?.data?.data.page);
            } else {
                setCaseStudy([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getCaseStudy();
    }, [page, limit])


    // Delete function
    const onSuccessData = () => {
        if (caseStudy.data.length === 1 && page > 1) {
            setPage(page - 1);
        } else {
            getCaseStudy(limit, page);
        }
    }


    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/case-study/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getCaseStudy(); // Refresh hiring data after updating
            } else {
                console.error("Failed to update status:", response.data.message);
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
                    <h2 className='page-title'>Case Studies</h2>
                    <LinkButton text="Add" to='/case-studies-add' className='secondary-button text-decoration-none px-4' />
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
                                                    <th width="100px">Banner</th>
                                                    <th>Title</th>
                                                    <th>Subtitle</th>
                                                    <th>Author</th>
                                                    <th>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {caseStudy?.data?.length > 0 ? (
                                                    caseStudy?.data?.map((test, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{(page - 1) * limit + index + 1}.</td>
                                                                <td>
                                                                    <div className='table-image'>
                                                                        <img src={`${imageURL}${test.image}`} alt="" className='w-100 h-100' />
                                                                    </div>
                                                                </td>
                                                                <td><p>{test.title}</p></td>
                                                                <td><p>{test.sub_title}</p></td>
                                                                <td><p>{test.author.name}</p></td>
                                                                <td>
                                                                    <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                                </td>
                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <ViewButton to='/case-studies-details' state={test} />
                                                                        <EditButton to='/case-studies-edit' state={test} />
                                                                        <DeleteButton id={test._id}
                                                                            endpoint={`${serverURL}/case-study`}
                                                                            onSuccess={onSuccessData} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="10"><NoDataAvailable /></td>
                                                    </tr>
                                                )}

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

export default CaseStudiesIndex

