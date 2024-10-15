
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import DeleteButton from '../../components/comman/DeleteButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { FaFacebookF, FaLink, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';
import { FaXTwitter } from 'react-icons/fa6';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';
import { toast } from 'react-toastify';
import NoDataAvailable from '../../components/comman/NoDataAvailable';


function TeamsIndex() {
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [team, setTeam] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);

    // Get Team
    const getTeams = async () => {
        setMainLoader(true);
        try {
            const response = await api.getWithToken(`${serverURL}/team?perPage=${limit}&page=${page}`)
            if (response.data.success === true) {
                setTeam(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setPage(response?.data?.data.page);
            } else {
                setTeam([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getTeams();
    }, [page, limit])


    // Delete function
    const onSuccessData = () => {
        if (team.data.length === 1 && page > 1) {
            setPage(page - 1);
        } else {
            getTeams(limit, page);
        }
    }

    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/team/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getTeams();
            } else {
                toast.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
    };


    return (
        <>
            {
                mainLoader && (
                    <LoaderComman />
                )}
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Team</h2>
                    <LinkButton text="Add" to='/teams-add' className='secondary-button text-decoration-none px-4' />
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
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Designation</th>
                                                    {/* <th>Description</th> */}
                                                    <th>Links</th>
                                                    <th width='100'>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {team?.data?.length > 0 ? (
                                                    team?.data?.map((test, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{(page - 1) * limit + index + 1}.</td>
                                                                <td>
                                                                    <div className='table-image'>
                                                                        <img src={`${imageURL}${test.image}`} alt="" className='w-100 h-100' />
                                                                    </div>
                                                                </td>
                                                                <td><p>{test.name}</p></td>
                                                                <td><p>{test.designation}</p></td>
                                                                {/* <td>{test.description}</td> */}
                                                                <td>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        {test.twitter_link && (<a
                                                                            href={test.linkedin_link}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            to='' className='table-edit-btn d-flex justify-content-center align-items-center linked' >
                                                                            <FaLinkedinIn />
                                                                        </a>)}
                                                                        {test.twitter_link && (<a
                                                                            href={test.twitter_link}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            to='' className='table-edit-btn d-flex justify-content-center align-items-center twitter' >
                                                                            <FaXTwitter />
                                                                        </a>)}
                                                                        {test.facebook_link && ( // Check if facebook_link is available
                                                                            <a
                                                                                href={test.facebook_link}
                                                                                className='table-edit-btn d-flex justify-content-center align-items-center facebook'
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                <FaFacebookF />
                                                                            </a>
                                                                        )}
                                                                        {test.other_link && (<a
                                                                            // href={`${imageURL}${test.file}`}
                                                                            href={test.other_link}

                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className='table-view-btn d-flex justify-content-center align-items-center'
                                                                        >
                                                                            <FaLink />
                                                                        </a>)}
                                                                        {!test.linkedin_link && !test.twitter_link && !test.facebook_link && !test.other_link && (
                                                                            <span>-</span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                                </td>
                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <EditButton to='/teams-edit' state={test} />
                                                                        <DeleteButton id={test._id}
                                                                            endpoint={`${serverURL}/team`}
                                                                            onSuccess={onSuccessData}
                                                                        />
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

export default TeamsIndex

