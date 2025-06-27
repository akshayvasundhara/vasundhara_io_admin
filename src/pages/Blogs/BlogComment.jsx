import React, { useEffect, useState } from 'react'
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
import api from '../../API/api';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import { toast } from 'react-toastify';
import LoaderComman from '../../components/comman/LoaderComman';
import NoDataAvailable from '../../components/comman/NoDataAvailable';
import { useLocation, useNavigate } from 'react-router-dom';
import { IframeView } from 'ckeditor5';

function BlogComments() {

    const serverURL = getServerURL();
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const imageURL = getImageURL();
    const [blog, setBlog] = useState([]);
    const [mainLoader, setMainLoader] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        getBlogCommentsList();
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getBlogCommentsList();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, selectedCategory]);

    const getBlogCommentsList = async () => {
        setMainLoader(true);
        try {
            let url = `${serverURL}/blog-comment`;
            const body = {};
            if (selectedCategory) body.category = selectedCategory;
            if (searchQuery) body.search = searchQuery;
            const response = await api.postWithToken(url, body);
            if (response.data.success === true) {
                setBlog(response.data.data || []);
            } else {
                setBlog([]);
            }
        } catch (error) {
            console.error("Error fetching comments:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='page-title'>Blog comment</h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row className='g-4 mb-4'>
                                        <Col md={6}>
                                            <div className="position-relative">
                                                <LableInput
                                                    className="form-control create-password-input overflow-hidden"
                                                    id="password"
                                                    placeholder="Search by blog title"
                                                    name='search'
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                                <span
                                                    className="position-absolute end-0 top-70 translate-middle-y cursor-pointer search-icon"
                                                >
                                                    <RiSearch2Line />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='overflow-x-auto'>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th width="50px">No.</th>
                                                    <th>Blog Title</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Comments</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {blog?.length > 0 ? (
                                                    blog?.map((test, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}.</td>
                                                                <td><p>{test.blogId?.title}</p></td>
                                                                <td><p>{test.name}</p></td>
                                                                <td><p>{test.email}</p></td>
                                                                <td><p>{test.message || ''}</p></td>
                                                                <td width={100}>
                                                                    <DeleteButton
                                                                        id={test._id}
                                                                        endpoint={`${serverURL}/blog-comment`}
                                                                        onSuccess={getBlogCommentsList}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5}><NoDataAvailable /></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout >
        </>
    )
}

export default BlogComments