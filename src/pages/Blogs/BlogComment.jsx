
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
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate()

    const categoryOptions = [
        { value: '', label: 'All' },
        ...category.map(cat => ({
            value: cat._id,
            label: cat.name
        }))
    ];

    useEffect(() => {
        getBlogCommentsList();
    }, [])

    useEffect(() => {
        if (location?.state?.page) {
            setPage(location?.state?.page || 1);
        }
    }, [location?.state?.page])

    useEffect(() => {
        if (location?.state?.page) {
            setPage(location?.state?.page || 1);

            const timeout = setTimeout(() => {
                navigate(location.pathname, { replace: true, state: null });
            }, 30000);

            return () => clearTimeout(timeout);
        }
    }, [location?.state?.page]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getBlogCommentsList();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, selectedCategory, page]);

    const getBlogCommentsList = async () => {
        setMainLoader(true);
        try {
            const response = await api.getWithToken(`${serverURL}/blog/comment?perPage=${limit}&page=${page}${selectedCategory ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`);
            if (response.data.success === true) {
                setBlog(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setPage(response?.data?.data.page);
            } else {
                setBlog([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    const onSuccessData = () => {
        if (blog.data.length === 1 && page > 1) {
            setPage(page - 1);
        } else {
            // getBlogs(limit, page);
        }
    }

    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/blog/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                // getBlogs();
            } else {
                toast.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1);
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
                                                    placeholder="Search blog"
                                                    name='search'
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                                <span
                                                    className="position-absolute end-0 top-70 translate-middle-y cursor-pointer search-icon"
                                                // onClick={() => getBlogs()}
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
                                                                <td>{(page - 1) * limit + index + 1}.</td>

                                                                <td><p>
                                                                    {test.name}
                                                                </p></td>
                                                                <td><p>{test.email}</p></td>
                                                                <td><p>{test.comment || ''}</p></td>

                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <ViewButton to='/blogs-details' state={test} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan={7}><NoDataAvailable /></td>
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
                                                if (location.state?.page) {
                                                    navigate(location.pathname, { replace: true, state: null });
                                                }
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

export default BlogComments