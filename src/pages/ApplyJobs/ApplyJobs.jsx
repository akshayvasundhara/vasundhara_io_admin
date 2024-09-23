
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import DeleteButton from '../../components/comman/DeleteButton';
import ViewButton from '../../components/comman/ViewButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function ApplyJobs() {

    return (
        <>
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Apply Jobs</h2>
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
                                                <th>First Name</th>
                                                <th>Email</th>
                                                <th>Position</th>
                                                <th>Mobile</th>
                                                <th>File</th>
                                                <th width='100'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>Jhon</td>
                                                <td>test@eaxmple.com</td>
                                                <td>laravel</td>
                                                <td>+919922610389</td>
                                                <td width={100}>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <Link to='' className='table-view-btn d-flex justify-content-center align-items-center'>
                                                            <FaLink />
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td width={100}>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <ViewButton to='/apply-jobs-view' />
                                                        <DeleteButton />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <CommanPagination />
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </Layout >
        </>
    )
}

export default ApplyJobs

