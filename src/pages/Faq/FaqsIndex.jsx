
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import DeleteButton from '../../components/comman/DeleteButton';
import CommanPagination from '../../components/comman/CommanPagination';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';


function FaqsIndex() {

    return (
        <>
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Faqs</h2>
                    <LinkButton text="Add" to='/faqs-add' className='secondary-button text-decoration-none px-4' />
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
                                                <th>Question</th>
                                                <th>Answer</th>
                                                <th width="100px">Type</th>
                                                <th width='100'>Status</th>
                                                <th width='100'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>What kind of games can Vasundhara build?</td>
                                                <td>We have various categories in game development including unity games, 2D & 3D games, native games, and so on.</td>
                                                <td>Game Development</td>
                                                <td>
                                                    <Switch />
                                                </td>
                                                <td width={100}>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <EditButton to='/faqs-add' />
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

export default FaqsIndex

