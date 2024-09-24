
import React from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import DeleteButton from '../../components/comman/DeleteButton';
import ViewButton from '../../components/comman/ViewButton';
import CommanPagination from '../../components/comman/CommanPagination';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';
import SelectInput from '../../components/comman/SelectInput';
import LableInput from '../../components/comman/LableInput';
import { RiSearch2Line } from 'react-icons/ri';


function BlogsListIndex() {

    const option = [
        { value: '1', label: 'Select Categories' },
        { value: '2', label: 'Application Development' },
        { value: '3', label: 'Website Development' },
        { value: '4', label: 'Game Development' },
        { value: '5', label: 'Billing' },
        { value: '6', label: 'About Services' },
    ];
    return (
        <>
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Blog</h2>
                    <LinkButton text="Add" to='/blogs-list-add' className='secondary-button text-decoration-none px-4' />
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row className='g-4 mb-4'>
                                        <Col md={6}>
                                            <SelectInput label="" options={option} />
                                        </Col>
                                        <Col md={6}>
                                            <div className="position-relative">
                                                <LableInput
                                                    // label="Search Blog:"
                                                    className="form-control create-password-input overflow-hidden"
                                                    id="password"
                                                    placeholder="Search blog"
                                                    name='password'
                                                />
                                                <span
                                                    className="position-absolute end-0 top-70 translate-middle-y cursor-pointer search-icon"
                                                >
                                                    <RiSearch2Line />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>


                                    <Table responsive="lg">
                                        <thead>
                                            <tr>
                                                <th width="50px">No.</th>
                                                <th width="80">Image</th>
                                                <th>Title</th>
                                                <th>Content</th>
                                                <th>Category</th>
                                                <th>Author</th>
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
                                                <td>mastering-the-our-teen-patti-multiplayer-card-game</td>
                                                <td>Elevate your gaming expertise by exploring the success story of our Teen Patti Multiplayer Card Game...</td>
                                                <td>client story</td>
                                                <td>Ronak Pipaliya</td>
                                                <td>
                                                    <Switch />
                                                </td>
                                                <td width={100}>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <ViewButton to='/blogs-details' />
                                                        <EditButton to='/blogs-list-add' />
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

export default BlogsListIndex

