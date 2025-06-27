import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import { Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import LableInput from '../../components/comman/LableInput';
import { RiSearch2Line } from 'react-icons/ri';
import api from '../../API/api';
import LoaderComman from '../../components/comman/LoaderComman';
import NoDataAvailable from '../../components/comman/NoDataAvailable';
import DeleteButton from '../../components/comman/DeleteButton';
import { useNavigate } from 'react-router-dom';
import { getServerURL } from '../../helper/envConfig';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from 'react-icons/md';

function Technology() {
    const serverURL = getServerURL();
    const [technologies, setTechnologies] = useState([]);
    const [mainLoader, setMainLoader] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
    const [currentTech, setCurrentTech] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [form, setForm] = useState({ name: '', link: '' });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getServiceList();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getServiceList();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const getServiceList = async () => {
        setMainLoader(true);
        try {
            let url = `${serverURL}/service`;
            if (searchQuery) {
                url += `?search=${encodeURIComponent(searchQuery)}`;
            }
            const response = await api.getWithToken(url);
            if (response.data.success === true) {
                setTechnologies(response.data.data || []);
            } else {
                setTechnologies([]);
            }
        } catch (error) {
            console.error("Error fetching services:", error.response ? error.response.data : error.message);
        } finally {
            setMainLoader(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleAdd = () => {
        setModalType('add');
        setCurrentTech(null);
        setForm({ name: '', link: '' });
        setFormErrors({});
        setShowModal(true);
    };

    const handleEdit = (tech) => {
        setModalType('edit');
        setCurrentTech(tech);
        setForm({ name: tech.name || '', link: tech.link || '' });
        setFormErrors({});
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentTech(null);
        setForm({ name: '', link: '' });
        setFormErrors({});
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!form.name.trim()) errors.name = 'Name is required';
        if (!form.link.trim()) errors.link = 'Link is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setModalLoading(true);
        try {
            if (modalType === 'add') {
                const response = await api.postWithToken(`${serverURL}/service`, form);
                if (response.data.success) {
                    toast.success('Service added successfully!');
                    handleModalClose();
                    getServiceList();
                }
            } else if (modalType === 'edit' && currentTech) {
                const response = await api.putWithToken(`${serverURL}/service/${currentTech._id}`, form);
                if (response.data.success) {
                    toast.success('Service updated successfully!');
                    handleModalClose();
                    getServiceList();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
            setFormErrors({ submit: error.response?.data?.message || 'An error occurred' });
        } finally {
            setModalLoading(false);
        }
    };

    // Custom delete handler to show toast
    const handleDeleteSuccess = () => {
        toast.success('Service deleted successfully!');
        getServiceList();
    };

    return (
        <>
            {mainLoader && <LoaderComman />}
            <Layout>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="page-title">Service  </h2>
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </div>
                <div className="font-family-poppins mt-3">
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row className='g-4 mb-4'>
                                        <Col md={6}>
                                            <div className="position-relative">
                                                <LableInput
                                                    className="form-control create-password-input overflow-hidden"
                                                    id="search-tech"
                                                    placeholder="Search technology by name"
                                                    name='search'
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                                <span className="position-absolute end-0 top-70 translate-middle-y cursor-pointer search-icon">
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
                                                    <th width='500px'>Name</th>
                                                    <th>Link</th>
                                                    <th width='150'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {technologies?.length > 0 ? (
                                                    technologies.map((tech, index) => (
                                                        <tr key={tech._id || index}>
                                                            <td>{index + 1}.</td>
                                                            <td><p>{tech.name}</p></td>
                                                            <td>
                                                                <a href={tech.link} target="_blank" rel="noopener noreferrer">
                                                                    {tech.link}
                                                                </a>
                                                            </td>
                                                            <td width={150}>
                                                                <div className='d-flex align-items-center justify-content-start gap-2'>
                                                                    <span className='table-edit-btn' style={{ cursor: 'pointer', padding: '5px' }} onClick={() => handleEdit(tech)}>
                                                                        <MdOutlineEdit />
                                                                    </span>
                                                                    <DeleteButton
                                                                        id={tech._id}
                                                                        endpoint={`${serverURL}/service`}
                                                                        onSuccess={handleDeleteSuccess}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4}><NoDataAvailable /></td>
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
            </Layout>
            <TechnologyModal
                show={showModal}
                onHide={handleModalClose}
                onSubmit={handleModalSubmit}
                loading={modalLoading}
                form={form}
                errors={formErrors}
                onChange={handleFormChange}
                type={modalType}
            />
        </>
    );
}

function TechnologyModal({ show, onHide, onSubmit, loading, form, errors, onChange, type }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'add' ? 'Add Service' : 'Edit Service'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            isInvalid={!!errors.name}
                            placeholder="Enter service name"
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Link</Form.Label>
                        <Form.Control
                            type="text"
                            name="link"
                            value={form.link}
                            onChange={onChange}
                            isInvalid={!!errors.link}
                            placeholder="Enter service link"
                        />
                        <Form.Control.Feedback type="invalid">{errors.link}</Form.Control.Feedback>
                    </Form.Group>
                    {errors.submit && <div className="text-danger mb-2">{errors.submit}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={loading}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (type === 'add' ? 'Add' : 'Edit')}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default Technology; 