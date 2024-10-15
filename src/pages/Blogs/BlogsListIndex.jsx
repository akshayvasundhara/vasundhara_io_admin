
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


function BlogsListIndex() {
    const serverURL = getServerURL();
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const imageURL = getImageURL();
    const [blog, setBlog] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Get blog category Type
    const getCategories = async () => {
        try {

            const response = await api.getWithToken(`${serverURL}/blog-category?status=1`)
            if (response.data.success === true) {
                setCategory(response.data.data.data || []);
            } else {
                setCategory([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    const categoryOptions = [
        { value: '', label: 'All' }, // All option
        ...category.map(cat => ({
            value: cat._id,
            label: cat.name
        }))
    ];
    // Get Blogs
    const getBlogs = async () => {
        setMainLoader(true);
        try {
            const response = await api.getWithToken(`${serverURL}/blog?perPage=${limit}&page=${page}${selectedCategory ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`);
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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getBlogs();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, selectedCategory, page]); // 

    // Delete function
    const onSuccessData = () => {
        if (blog.data.length === 1 && page > 1) {
            setPage(page - 1);
        } else {
            getBlogs(limit, page);
        }
    }


    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/blog/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getBlogs(); // Refresh hiring data after updating
            } else {
                toast.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
    };

    // Handle category change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value); // Set the selected category
        setPage(1); // Reset to first page when category changes
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset to the first page when search changes
    };
    return (
        <>

            {mainLoader && (
                <LoaderComman />
            )}
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
                                            <SelectInput label="" options={categoryOptions} value={selectedCategory}
                                                onChange={handleCategoryChange} />
                                        </Col>
                                        <Col md={6}>
                                            <div className="position-relative">
                                                <LableInput
                                                    // label="Search Blog:"
                                                    className="form-control create-password-input overflow-hidden"
                                                    id="password"
                                                    placeholder="Search blog"
                                                    name='search'
                                                    value={searchQuery} // Set the value for the input
                                                    onChange={handleSearchChange}
                                                />
                                                <span
                                                    className="position-absolute end-0 top-70 translate-middle-y cursor-pointer search-icon"
                                                    onClick={() => getBlogs()}
                                                >
                                                    <RiSearch2Line />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='overflow-x-auto'>

                                        <Table >
                                            <thead>
                                                <tr>
                                                    <th width="50px">No.</th>
                                                    <th width="80">Image</th>
                                                    <th>Title</th>
                                                    <th>Content</th>
                                                    <th>Category</th>
                                                    <th>Unique Route</th>
                                                    <th>Author</th>
                                                    <th width='100'>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {blog?.data?.length > 0 ? (
                                                    blog?.data?.map((test, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{(page - 1) * limit + index + 1}.</td>
                                                                <td>
                                                                    <div className='table-image'>
                                                                        <img src={`${imageURL}${test.image}`} alt="" className='w-100 h-100' />
                                                                    </div>
                                                                </td>
                                                                <td><p>
                                                                    {test.title}
                                                                </p></td>
                                                                <td><p>{test.content}</p></td>
                                                                <td><p>{test.category.name}</p></td>
                                                                <td><p>{test.tag}</p></td>
                                                                <td><p>{test.author.name}</p></td>
                                                                <td>
                                                                    <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                                </td>
                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <ViewButton to='/blogs-details' state={test} />
                                                                        <EditButton to='/blogs-list-edit' state={test} />
                                                                        <DeleteButton id={test._id}
                                                                            endpoint={`${serverURL}/blog`}
                                                                            onSuccess={onSuccessData}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8"><NoDataAvailable /></td>
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

export default BlogsListIndex

