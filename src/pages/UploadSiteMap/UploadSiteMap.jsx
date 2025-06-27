import React, { useState, useRef } from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import Layout from '../../layout/Layout';
import api from '../../API/api';
import { getServerURL } from '../../helper/envConfig';

function UploadSiteMap() {
    const serverURL = getServerURL();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/xml') {
            setSelectedFile(file);
            setError('');
        } else {
            setSelectedFile(null);
            setError('Please select a valid XML file.');
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setSuccess('');
        if (!selectedFile) {
            setError('Please select an XML file.');
            return;
        }
        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const res = await api.postWithToken(`${serverURL}/upload-sitemap`, formData);
            const data = res.data;
            if (data.success) {
                setSelectedFile(null);
                setSuccess('Sitemap uploaded successfully!');
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                setError(data.message || 'Upload failed.');
            }
        } catch (err) {
            setError('Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Layout>
            <Row className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <Col xs={12} sm={8} md={6} lg={5} xl={4}>
                    <Card className="shadow-sm border-0 rounded-4">
                        <Card.Body>
                            <h2 className="page-title mb-4 text-center">Upload Sitemap (.xml)</h2>
                            <Form onSubmit={handleUpload}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="file"
                                        accept=".xml,text/xml"
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                        ref={fileInputRef}
                                    />
                                </Form.Group>
                                {error && <div className="text-danger mb-3">{error}</div>}
                                {success && <div className="text-success mb-3">{success}</div>}
                                <div className="d-flex justify-content-center">
                                    <Button variant="primary" type="submit" disabled={uploading} className="px-4">
                                        {uploading ? 'Uploading...' : 'Upload'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default UploadSiteMap;