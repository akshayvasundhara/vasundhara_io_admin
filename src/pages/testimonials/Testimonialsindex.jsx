
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import DeleteButton from '../../components/comman/DeleteButton';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';


function Testimonialsindex() {

    return (
        <>
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
                                            <tr>
                                                <td>1.</td>
                                                <td>
                                                    <div className='table-image'>
                                                        <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="" className='w-100 h-100' />
                                                    </div>
                                                </td>
                                                <td>Vasundhara</td>
                                                <td>Vasundhara</td>
                                                <td>
                                                    <Switch />
                                                </td>
                                                <td width={100}>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <EditButton to='/testimonials-add' />
                                                        <DeleteButton />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </Layout >
        </>
    )
}

export default Testimonialsindex
