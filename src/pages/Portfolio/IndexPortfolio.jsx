
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import DeleteButton from '../../components/comman/DeleteButton';
import CommanPagination from '../../components/comman/CommanPagination';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';
import Switch from '../../components/comman/Switch';
import ViewButton from '../../components/comman/ViewButton';
import EditButton from '../../components/comman/EditButton';
import LinkButton from '../../components/comman/LinkButton';
import { toast } from 'react-toastify';
import NoDataAvailable from '../../components/comman/NoDataAvailable';
import { RiSearch2Line } from 'react-icons/ri';
import SelectInput from '../../components/comman/SelectInput';
import LableInput from '../../components/comman/LableInput';


function IndexPortfolio() {

    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [portFolio, setPortFolio] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);
    const [category, setCategory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);


    const categoryOptions = [
        { value: '', label: 'All' },
        ...category.map(cat => ({
            value: cat._id,
            label: cat.name
        }))
    ];

    useEffect(() => {
        getCategories();
    }, [])


    const getCategories = async () => {
        try {
            const response = await api.getWithToken(`${serverURL}/blog-category?status=1&type=portfolio`)
            if (response.data.success === true) {
                setCategory(response.data.data.data || []);
            } else {
                setCategory([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        }
    }

    // Get PortFolio
    const getPortFolio = async () => {
        setMainLoader(true);
        try {

            const response = await api.getWithToken(`${serverURL}/portfolio?perPage=${limit}&page=${page}${selectedCategory ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`)
            if (response.data.success === true) {
                setPortFolio(response.data.data || []);
                setPaginationData(response?.data?.data.paginationValue);
                setPage(response?.data?.data.page);
            } else {
                setPortFolio([]);
            }

        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getPortFolio();
    }, [page, selectedCategory, searchQuery])

    // Delete function
    const onSuccessData = () => {
        if (portFolio.data.length === 1 && page > 1) {
            setPage(page - 1);
        } else {
            getPortFolio(limit, page);
        }
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setPage(1);
    };

    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/portFolio/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getPortFolio(); // Refresh hiring data after updating
            } else {
                console.error("Failed to update status:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
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
                    <h2 className='page-title'>Portfolio</h2>
                    <LinkButton text="Add" to='/portfolio-add' className='secondary-button text-decoration-none px-4' />
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row className='g-4 mb-4'>
                                        <Col md={6}>
                                            <SelectInput label="" options={categoryOptions} value={selectedCategory}
                                                select="category"
                                                onChange={handleCategoryChange} />
                                        </Col>
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
                                                    onClick={() => getPortFolio()}
                                                >
                                                    <RiSearch2Line />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='overflow-auto'>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th width="50px">No.</th>
                                                    <th width="100px">Image</th>
                                                    <th>Title</th>
                                                    <th>Category</th>
                                                    <th>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {portFolio?.data?.length > 0 ? (
                                                    portFolio.data.map((test, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{(page - 1) * limit + index + 1}.</td>
                                                                <td>
                                                                    <div className='table-image'>
                                                                        <img src={`${imageURL}${test.image}`} alt="" className='w-100 h-100' />
                                                                    </div>
                                                                </td>
                                                                <td><p>{test.title}</p></td>
                                                                <td><p>{test?.category?.name || ''}</p></td>
                                                                <td>
                                                                    <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                                </td>
                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <ViewButton to='/portfolio-view' state={test} />
                                                                        <EditButton to='/portfolio-edit' state={test} />
                                                                        <DeleteButton id={test._id}
                                                                            endpoint={`${serverURL}/portfolio`}
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

export default IndexPortfolio

