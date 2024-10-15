
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card, Table } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import DeleteButton from '../../components/comman/DeleteButton';
import CommanPagination from '../../components/comman/CommanPagination';
import EditButton from '../../components/comman/EditButton';
import Switch from '../../components/comman/Switch';
import { getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import { toast } from 'react-toastify';
import LoaderComman from '../../components/comman/LoaderComman';
import SelectInput from '../../components/comman/SelectInput';
import NoDataAvailable from '../../components/comman/NoDataAvailable';


function FaqsIndex() {
    const serverURL = getServerURL();
    const [faq, setFaq] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [mainLoader, setMainLoader] = useState(true);
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Get FAQ
    const getFAQ = async () => {
        setMainLoader(true);
        try {
            const response = await api.getWithToken(`${serverURL}/faqs?perPage=${limit}&page=${page}${selectedCategory ? `&type=${selectedCategory}` : ''}`);

            if (response.data.success === true) {
                setFaq(response.data.data.data || []);
                setPaginationData(response.data?.data?.paginationValue);
                setPage(response?.data?.data.page);
            } else {
                setFaq([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    }

    useEffect(() => {
        getFAQ();
    }, [page, limit, selectedCategory])

    // Delete function
    const onSuccessData = () => {
        if (faq.length === 1 && page > 1) {
            setPage(page - 1);
        } else {
            getFAQ(limit, page);
        }
    }


    // Update status
    const updateStatus = async (itemId, newStatus) => {
        try {
            const response = await api.patchWithToken(`${serverURL}/faqs/${itemId}`, { status: newStatus });
            if (response.data.success) {
                toast.info("Status updated successfully.");
                getFAQ(); // Refresh hiring data after updating
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error.response ? error.response.data : error.message);
        }
    };

    // Get FAQ Type
    const getOptions = async () => {
        try {
            const response = await api.getWithToken(`${serverURL}/faqs_type`);
            if (response.data.success === true) {
                const formattedOptions = [
                    { label: 'All', value: '' }, // Value set to an empty string for "All"
                    ...response.data.data.data.map(item => ({
                        label: item.label,
                        value: item.value,
                    })),
                ];
                setOptions(formattedOptions);
            } else {
                setOptions([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    };

    useEffect(() => {
        getOptions();
    }, [])


    // Handle category change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        // Set the selected category
        setPage(1); // Reset to first page when category changes
    };

    return (
        <>
            {
                mainLoader && (
                    <LoaderComman />
                )}
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
                                    <Row className='g-4 mb-4'>
                                        <Col md={6}>
                                            <SelectInput label="" options={options} value={selectedCategory}
                                                onChange={handleCategoryChange} />
                                        </Col>
                                    </Row>
                                    <div className="overflow-auto">
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th width="50px">No.</th>
                                                    <th>Question</th>
                                                    <th>Answer</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th width='100'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {faq && faq?.length > 0 ? (
                                                    faq?.map((test, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{(page - 1) * limit + index + 1}.</td>
                                                                <td><p>{test.question}</p></td>
                                                                <td><p>{test.answer}</p></td>
                                                                <td>
                                                                    {test.type[0]?.replace(/_/g, ' ')
                                                                        .split(' ')
                                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                                                        .join(' ') || 'N/A'}
                                                                </td>
                                                                <td>
                                                                    <Switch mode={test.status} index={index} itemId={test._id} onToggle={updateStatus} />
                                                                </td>
                                                                <td width={100}>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <EditButton to='/faqs-edit' state={test} />
                                                                        <DeleteButton id={test._id}
                                                                            endpoint={`${serverURL}/faqs`}
                                                                            onSuccess={onSuccessData}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6"><NoDataAvailable /></td>
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

export default FaqsIndex

