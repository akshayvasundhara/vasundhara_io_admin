
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Row, Col, Card } from 'react-bootstrap';
import LinkButton from '../../components/comman/LinkButton';
import LableInput from '../../components/comman/LableInput';
import Textarea from '../../components/comman/Textarea';
import FileInput from '../../components/comman/FileInput';
import Switch from '../../components/comman/Switch';
import CommanButton from '../../components/comman/CommanButton';
import { ImArrowLeft } from "react-icons/im";
import SelectInput from '../../components/comman/SelectInput';
import MyEditor from '../../components/comman/MyEditor';
import { getImageURL, getServerURL } from '../../helper/envConfig';
import api from '../../API/api';
import { useLocation, useNavigate } from 'react-router-dom';
import SingleError from '../../helper/SingleError';
import { ValidateFields } from '../../components/validate/ValidateFields';
import ErrorFilter from '../../helper/errorFilter';
import { errorResponse } from '../../helper/error';
import { toast } from 'react-toastify';
import LoaderComman from '../../components/comman/LoaderComman';
const requireField = [
    "title",
    "seo",
    "content",
    "main_content",
    "status",
    "date",
    "image",
    "category",
    "author",
    "likes",
    "views",
    "blog_read_time"
];


function AddBlogList() {

    const location = useLocation();
    const state = location.state || {};

    const [team, setTeam] = useState([]);
    const [category, setCategory] = useState([]);
    const [main_content, setMainContent] = useState("");
    const [errors, setErrors] = useState({});

    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const [status, setStatus] = useState(state.status !== undefined ? state.status : 1);
    const [submitCount, setSubmitCount] = useState(0);

    const [isFeatured, setIsFeatured] = useState(state.isFeatured !== undefined ? state.isFeatured : 1);
    const [isTrending, setIsTrending] = useState(state.isTrending !== undefined ? state.isTrending : 1);
    const [states, setStates] = useState({});
    const [image, setImage] = useState(null);
    const [mainLoader, setMainLoader] = useState(false);
    const navigate = useNavigate();

    // Function to handle the toggle switch
    const handleToggle = () => {
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
    };

    const handleToggleFeature = () => {
        setIsFeatured(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
    };

    const handleToggleTrending = () => {
        setIsTrending(prevStatus => (prevStatus === 0 ? 1 : 0)); // Toggle between 0 and 1
    };


    // Get Member
    const getMember = async () => {
        try {
            const response = await api.getWithToken(`${serverURL}/team?status=1`)
            if (response.data.success === true) {
                setTeam(response.data.data.data || []);
            } else {
                setTeam([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        }
    }
    useEffect(() => {
        getMember();
    }, [])

    // Get Category
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


    const teamOptions = team.map(member => ({
        value: member._id,
        label: member.name
    }));


    const categoryOptions = category.map(cat => ({
        value: cat._id,
        label: cat.name
    }));

    // Close Blog
    const closeBlog = async (e) => {
        setStates({});
        navigate('/blogs-list');
    }


    // Get State 
    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setMainContent(state.main_content);
            setStates({
                title: state.title,
                seo: state.seo,
                content: state.content,
                main_content: state.main_content,
                status: state.status,
                isFeatured: state.isFeatured,
                isTrending: state.isTrending,
                date: state.date ? new Date(state.date).toISOString().split("T")[0] : "",
                category: state.category._id,
                author: state.author._id,  // Set default to empty array if not available
                likes: state.likes,
                views: state.views,
                blog_read_time: state.blog_read_time,
            });
            if (state.image) {
                const fullImageUrl = `${imageURL}${state.image}`;
                setImage(fullImageUrl);
            } else {
                setImage(null); // Clear image if there's no valid image
            }
        }
    }, [state]);

    // Handle Change
    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        if (submitCount > 0) {
            let validationErrors = ValidateFields({ ...states, [name]: value, image: newValue });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
                delete errors.image;
            }
        }
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    }

    // Add Edit Blog
    const addBlog = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setSubmitCount(prevCount => prevCount + 1);
        const updatedValues = { ...states, image, status };

        let validationErrors = ValidateFields(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);
        if (image) {
            delete errors.image;
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = new FormData(); // Create FormData for file upload
                formData.append('title', updatedValues.title);
                formData.append('seo', updatedValues.seo ? updatedValues.seo : "");
                formData.append('content', updatedValues.content);
                formData.append('main_content', updatedValues.main_content);
                formData.append('date', updatedValues.date);
                formData.append('category', updatedValues.category ? updatedValues.category : categoryOptions[0].value);
                formData.append('author', updatedValues.author ? updatedValues.author : teamOptions[0].value);
                formData.append('status', status);
                formData.append('isFeatured', isFeatured);
                formData.append('isTrending', isTrending);
                formData.append('likes', updatedValues.likes);
                formData.append('views', updatedValues.views);
                formData.append('blog_read_time', updatedValues.blog_read_time);
                formData.append('image', image);
                setMainLoader(true); // Start loader
                let response;
                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/blog/${state._id}`, formData);
                } else {
                    response = await api.postWithToken(`${serverURL}/blog`, formData);
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/blogs-list');
                } else if (response?.data?.success === false) {
                    if (typeof response?.data?.message === "string")
                        toast.error(response?.data?.message);
                }
            } catch (error) {
                setMainLoader(false);
                errorResponse(error);
            } finally {
                setMainLoader(false);
            }
        }
    };

    // Main content change
    const handleChangeHtmlData = (data) => {
        setStates((prevValues) => ({
            ...prevValues,
            main_content: data, // Also update the states object
        }));
    };

    return (
        <>
            {mainLoader && (
                <LoaderComman />
            )}
            <Layout>
                <div className='d-flex align-items-center gap-2'>
                    <LinkButton text={<ImArrowLeft />} to='/blogs-list' className='back-btn d-flex justify-content-center align-items-center' />
                    <h2 className='page-title'>{location.pathname === '/blogs-list-edit' ? 'Edit Blog' : 'Add Blog'} </h2>
                </div>
                <div className='font-family-poppins mt-3'>
                    <Row xs={12} className="table-card">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <form action="">
                                        <Row className='g-4'>
                                            <Col md={6}>
                                                <LableInput
                                                    label="Title:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter title"
                                                    type="text"
                                                    name='title'
                                                    value={states?.title || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.title} />
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput label="Category:" options={categoryOptions} name="category" value={states.category} onChange={handleChange} />
                                            </Col>
                                            <Col md={6}>
                                                <LableInput
                                                    label="Date:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter date"
                                                    type="date"
                                                    name='date'
                                                    value={states?.date || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.date} />
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput label="Author:" options={teamOptions} name="author"  // Add name here
                                                    value={states.author}  // Bind to the state
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="View:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter view"
                                                    type="number"
                                                    name='views'
                                                    value={states?.views || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.views} />
                                            </Col>

                                            <Col md={4}>
                                                <LableInput
                                                    label="Likes:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter likes"
                                                    type="number"
                                                    name='likes'
                                                    value={states?.likes || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.likes} />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    label="Blog Read Time:"
                                                    className="form-control"
                                                    id="text"
                                                    placeholder="Enter blog read time (In minutes)"
                                                    type="number"
                                                    name='blog_read_time'
                                                    value={states?.blog_read_time || ""}
                                                    // onKeyPress={handleKeyPress}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.blog_read_time} />
                                            </Col>
                                            <Col md={6} className='switch-box'>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Status:
                                                    </label>
                                                    <Switch mode={state.status} onToggle={handleToggle} index={0} />
                                                </div>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Featured:
                                                    </label>
                                                    <Switch mode={state.isFeatured} onToggle={handleToggleFeature} index={1} />
                                                </div>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Trending:
                                                    </label>
                                                    <Switch mode={state.isTrending} onToggle={handleToggleTrending} index={2} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <FileInput label="Image:" setImage={setImage} initialImage={image} onChange={handleChange} />
                                                    <SingleError error={errors?.image} />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Textarea label="Content:" rows="9" type="text" name="content" value={states.content} onChange={handleChange} />
                                                <SingleError error={errors?.content} />
                                            </Col>
                                            <Col md={12}>
                                                <label htmlFor="industry-select" className="form-label text-default">
                                                    Main Content:
                                                </label>
                                                <MyEditor
                                                    htmlData={main_content}
                                                    onChangeHtmlData={handleChangeHtmlData}
                                                />
                                                <SingleError error={errors?.main_content} />
                                            </Col>

                                            <Col md={12}>
                                                <Textarea label="Head Tags By SEO:" rows="9" type="text" name="seo" value={states.seo} onChange={handleChange} />
                                                <SingleError error={errors?.seo} />
                                            </Col>

                                        </Row>
                                    </form>

                                    <div className="d-flex justify-content-between align-items-center mt-5">
                                        <div></div>
                                        <div className='d-flex gap-2'>
                                            <CommanButton className="save-btn" text="Save" handleSubmit={addBlog} />
                                            <CommanButton className="cancel-btn" text="Cancel" handleSubmit={closeBlog} />
                                        </div>
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

export default AddBlogList
