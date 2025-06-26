import React, { Fragment, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'
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
import { FaPlus, FaTrash } from 'react-icons/fa';
import { PiPlusBold } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';
import SummerEditor from '../../components/comman/SummerEditor';

const requireField = [
    "title",
    "category",
    "date",
    "author",
    "tag",
    "image",
    "content",
    "main_content",
];

function AddBlogList() {

    const location = useLocation();
    const serverURL = getServerURL();
    const imageURL = getImageURL();
    const navigate = useNavigate();
    const state = location.state || {};
    const [team, setTeam] = useState([]);
    const [category, setCategory] = useState([]);
    const [main_content, setMainContent] = useState("");
    const [table_content, setTableContent] = useState("");
    const [errors, setErrors] = useState({});
    const [submitCount, setSubmitCount] = useState(0);

    const [faqList, setFaqList] = useState(() => {
        if (state?.faqs && state.faqs.length > 0) {
            return [...state.faqs, { question: '', answer: '' }];
        } else {
            return [{ question: '', answer: '' }];
        }
    });

    const [status, setStatus] = useState(state.status !== undefined ? state.status : 0);
    const [isFeatured, setIsFeatured] = useState(state.isFeatured !== undefined ? state.isFeatured : 1);
    const [isTrending, setIsTrending] = useState(state.isTrending !== undefined ? state.isTrending : 1);
    const [states, setStates] = useState({ faqs: [{ question: '', answer: '' }], status: 0, isTrending: 0, isFeatured: 0 });
    const [image, setImage] = useState(null);
    const [mainLoader, setMainLoader] = useState(false);
    const summerEditorRef = useRef();
    

    useEffect(() => {
        getMember();
        getCategories();
    }, [])

    useEffect(() => {
        if (state && Object.keys(state).length > 0) {
            setMainContent(state?.main_content || "");
            setTableContent(state?.table_content || "");
            setStates({
                title: state.title || "",
                seo: state.seo || "",
                content: state.content || "",
                table_content: state.table_content || "",
                main_content: state.main_content || "",
                status: state.status || 0,
                isFeatured: state.isFeatured || 0,
                isTrending: state.isTrending || 0,
                date: state.date ? new Date(state.date).toISOString().split("T")[0] : "",
                category: state.category?._id,
                author: state?.author?._id,
                likes: state.likes,
                views: state.views,
                blog_read_time: state.blog_read_time,
                tag: state.tag,
                faqs: state?.faqs?.length > 0 ? state?.faqs : [{ question: '', answer: '' }],
                image: state.image || null
            });
            if (state.image) {
                const fullImageUrl = `${imageURL}${state.image}`;
                setImage(fullImageUrl);
            } else {
                setImage(null);
            }
        }
    }, [state]);

    const handleToggle = () => {
        setStates((prevStates) => ({ ...prevStates, status: prevStates.status === 0 ? 1 : 0 }));
        setStatus(prevStatus => (prevStatus === 0 ? 1 : 0));
    };

    const handleToggleFeature = () => {
        setStates((prevStates) => ({ ...prevStates, isFeatured: prevStates.isFeatured === 0 ? 1 : 0 }));
        setIsFeatured(prevStatus => (prevStatus === 0 ? 1 : 0));
    };

    const handleToggleTrending = () => {
        setStates((prevStates) => ({ ...prevStates, isTrending: prevStates.isTrending === 0 ? 1 : 0 }));
        setIsTrending(prevStatus => (prevStatus === 0 ? 1 : 0));
    };

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

    const teamOptions = team.map(member => ({
        value: member._id,
        label: member.name
    }));

    const categoryOptions = category.map(cat => ({
        value: cat._id,
        label: cat.name
    }));

    const closeBlog = async (e) => {
        setStates({});
        navigate('/blogs-list', { state: { page: state?.page } });
    }

    const handleChange = async (e) => {
        const { name, value, checked, type } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        if (submitCount > 0) {
            let validationErrors = ValidateFields({ ...states, [name]: value });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors[name];
            }
        }
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    }

    const addBlog = async (e) => {
        e.preventDefault();

        let latestContent = main_content;
        if (summerEditorRef.current) {
            latestContent = summerEditorRef.current.getCurrentContent();
            setMainContent(latestContent);
            setStates((prev) => ({ ...prev, main_content: latestContent }));
        }

        setSubmitCount(prevCount => prevCount + 1);

        const updatedValues = { ...states, main_content: latestContent };

        let validationErrors = ValidateFields(updatedValues);
        validationErrors = ErrorFilter(validationErrors, requireField);
        if (image) {
            delete errors.image;
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors)?.length) {
            Object.entries(validationErrors)?.map(([key], i) => {
                if (i == 0)
                    document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
            });
        }

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = new FormData();
                formData.append('title', updatedValues.title);
                formData.append('seo', updatedValues.seo ? updatedValues.seo : "");
                formData.append('content', updatedValues.content || "");
                formData.append('main_content', updatedValues.main_content || "");
                formData.append('table_content', updatedValues?.table_content || "");
                formData.append('date', updatedValues.date);
                formData.append('category', updatedValues.category ? updatedValues.category : categoryOptions[0].value);
                formData.append('author', updatedValues.author ? updatedValues.author : teamOptions[0].value);
                formData.append('status', status || 0);
                formData.append('isFeatured', isFeatured);
                formData.append('isTrending', isTrending);
                formData.append('likes', updatedValues.likes || 0);
                formData.append('views', updatedValues.views || 0);
                formData.append('blog_read_time', updatedValues.blog_read_time || "");
                formData.append('tag', updatedValues.tag);
                formData.append('image', image);
                if (updatedValues?.faqs?.length > 0)
                    formData.append('faqs', JSON.stringify(updatedValues?.faqs));
                else
                    formData.append('faqs', JSON.stringify([]));
                setMainLoader(true);
                let response;
                if (state._id) {
                    response = await api.patchWithToken(`${serverURL}/blog/${state._id}`, formData);
                } else {
                    response = await api.postWithToken(`${serverURL}/blog`, formData);
                }
                if (response?.data.success === true) {
                    toast.info(response?.data.message);
                    navigate('/blogs-list', { state: { page: state?.page } });
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

    const handleChangeHtmlData = (data) => {
        if (submitCount > 0) {
            let validationErrors = ValidateFields({ ...states, main_content: data });
            validationErrors = ErrorFilter(validationErrors, requireField);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                delete errors["main_content"];
            }
        }
        setStates((prevValues) => ({
            ...prevValues,
            main_content: data,
        }));

    };
    const handleChangeTableHtmlData = (data) => {
        setStates((prevValues) => ({
            ...prevValues,
            table_content: data,
        }));
    };

    const addFAQ = () => {
        const newFaq = faqList[faqList.length - 1];
        const trimmedQuestion = newFaq.question.trim();
        const trimmedAnswer = newFaq.answer.trim();

        if (trimmedQuestion && trimmedAnswer) {
            if (
                trimmedQuestion.length >= 3 &&
                trimmedQuestion.length <= 255 &&
                trimmedAnswer.length >= 3 &&
                trimmedAnswer.length <= 500
            ) {
                setFaqList([...faqList, { question: '', answer: '' }]);
                setStates({ ...states, faqs: faqList });
            } else {
                alert('Question must be between 3 and 255 characters, and answer must be between 3 and 500 characters.');
            }
        } else {
            alert('Please fill both question and answer with valid content. Spaces are not considered valid.');
        }
    };

    const deleteFAQ = (index) => {
        const updatedFaqList = faqList.filter((_, i) => i !== index);
        setFaqList(updatedFaqList);
        setStates({ ...states, faqs: updatedFaqList });
    };

    const handleArrayChange = (name, newValues) => {
        setStates((prevValues) => ({
            ...prevValues,
            [name]: newValues,
        }));

        // if (submitCount > 0) {
        //     const updatedValues = { ...states, [name]: newValues };
        //     let validationErrors = BlogValidates(updatedValues);
        //     validationErrors = ErrorFilter(validationErrors, requireField);
        //     setErrors(validationErrors);
        //     if (Object.keys(validationErrors).length === 0) {
        //         delete errors[name];
        //     }
        // }
    };

    const handleRemoveFAQ = (index) => {
        setStates((prevStates) => ({
            ...prevStates,
            faqs: prevStates.faqs.filter((_, i) => i !== index),
        }));
    };

    const handleAddFAQ = () => {
        const data = states?.faqs;
        if (data?.length > 0) {
            if (data[data?.length - 1]?.question !== '' && data[data?.length - 1]?.answer !== '') {
                setStates((prevStates) => ({
                    ...prevStates,
                    faqs: [...prevStates.faqs, { question: '', answer: '' }]
                }));
            } else {
                alert('Please enter both question and answer');
            }
        }
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
                                    <form>
                                        <Row className='g-3'>
                                            <Col md={6} >
                                                <LableInput
                                                    required={true}
                                                    label="Title"
                                                    className="form-control"
                                                    id="title"
                                                    placeholder="Enter title"
                                                    type="text"
                                                    name='title'
                                                    value={states?.title || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.title} />
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput id={"category"} required={true} select={"category"} label="Category" options={categoryOptions} name="category" value={states.category} onChange={handleChange} />
                                                <SingleError error={errors?.category} />
                                            </Col>
                                            <Col md={6}>
                                                <LableInput
                                                    required={true}
                                                    label="Date"
                                                    className="form-control"
                                                    id="date"
                                                    placeholder="Enter date"
                                                    type="date"
                                                    name='date'
                                                    value={states?.date || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.date} />
                                            </Col>
                                            <Col md={6}>
                                                <SelectInput id="author" required={true} select={"author"} label="Author" options={teamOptions} name="author"  // Add name here
                                                    value={states.author}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.author} />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    required={false}
                                                    label="View"
                                                    className="form-control"
                                                    id="views"
                                                    placeholder="Enter view"
                                                    type="number"
                                                    name='views'
                                                    value={states?.views || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.views} />
                                            </Col>

                                            <Col md={4}>
                                                <LableInput
                                                    required={false}
                                                    label="Likes"
                                                    className="form-control"
                                                    id="likes"
                                                    placeholder="Enter likes"
                                                    type="number"
                                                    name='likes'
                                                    value={states?.likes || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.likes} />
                                            </Col>
                                            <Col md={4}>
                                                <LableInput
                                                    required={false}
                                                    label="Blog Read Time"
                                                    className="form-control"
                                                    id="blog_read_time"
                                                    placeholder="Enter blog read time (In minutes)"
                                                    type="number"
                                                    name='blog_read_time'
                                                    value={states?.blog_read_time || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.blog_read_time} />
                                            </Col>
                                            <Col md={12}>
                                                <LableInput
                                                    required={true}
                                                    label="Unique Route"
                                                    className="form-control"
                                                    id="tag"
                                                    placeholder="Enter unique"
                                                    type="text"
                                                    name='tag'
                                                    value={states?.tag || ""}
                                                    onChange={handleChange}
                                                />
                                                <SingleError error={errors?.tag} />
                                            </Col>
                                            <Col md={6} className='switch-box'>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Status
                                                    </label>
                                                    <Switch mode={states?.status} onToggle={handleToggle} index={0} />
                                                </div>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Featured
                                                    </label>
                                                    <Switch mode={states.isFeatured} onToggle={handleToggleFeature} index={1} />
                                                </div>
                                                <div className='d-flex align-items-center gap-2 mb-3'>
                                                    <label htmlFor="industry-select" className="form-label text-default mb-0">
                                                        Trending
                                                    </label>
                                                    <Switch mode={states.isTrending} onToggle={handleToggleTrending} index={2} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <FileInput name="image" id="image" required={true} label="Image" setImage={setImage} initialImage={image} onChange={handleChange} />
                                                    <SingleError error={errors?.image} />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Textarea id="content" required={true} label="Content" rows="9" type="text" name="content" value={states.content} onChange={handleChange} />
                                                <SingleError error={errors?.content} />
                                            </Col>
                                            <Col md={12}>
                                                <label htmlFor="industry-select" className="form-label text-default">
                                                    Table of Content
                                                </label>

                                                <MyEditor
                                                    htmlData={table_content}
                                                    onChangeHtmlData={handleChangeTableHtmlData}
                                                />
                                                {/* <SummerEditor htmlContent={table_content} setHtmlContent={handleChangeTableHtmlData} id="table_content" /> */}
                                            </Col>
                                            <Col md={12}>
                                                <label htmlFor="main_content" className="form-label text-default">
                                                    Main Content
                                                    <span className="star">*</span>
                                                </label>
                                                <SummerEditor
                                                    ref={summerEditorRef}
                                                    htmlContent={main_content}
                                                    setHtmlContent={handleChangeHtmlData}
                                                />
                                                {/* <MyEditor
                                                    htmlData={main_content}
                                                    onChangeHtmlData={handleChangeHtmlData}
                                                    className={true}
                                                    name="main_content"
                                                /> */}
                                                <SingleError error={errors?.main_content} />
                                            </Col>

                                            <Col md={12}>
                                                <Textarea id={"seo"} label="Head Tags By SEO" rows="9" type="text" name="seo" value={states.seo} onChange={handleChange} />
                                                <SingleError error={errors?.seo} />
                                            </Col>
                                        </Row>
                                        <hr />
                                        <div className='d-flex justify-content-between align-items-center mb-3'>
                                            <label htmlFor="industry-select" className="form-label text-default form-title mb-0">
                                                FAQs
                                            </label>
                                            <div className="input-add d-inline-flex justify-content-center align-items-center" onClick={handleAddFAQ}>
                                                <PiPlusBold />
                                            </div>
                                        </div>
                                        {/* {faqList.map((faq, index) => (
                                            <Row key={index} className="g-4">
                                                <Col md={12} className='mb-4'>
                                                    <div className='d-flex align-items-end gap-2'>
                                                        <div className='w-100 d-flex align-items-end gap-2'>
                                                            <div className='w-100'>
                                                                <label htmlFor="signin-username" className="form-label text-default" id="email">Question</label>
                                                                <div className='label-none'>
                                                                    <LableInput
                                                                        label="Question"
                                                                        className="form-control"
                                                                        id="text"
                                                                        placeholder="Enter question"
                                                                        type="text"
                                                                        name="question"
                                                                        value={faq.question}
                                                                        onChange={(e) => {
                                                                            const updatedFaqList = [...faqList];
                                                                            updatedFaqList[index].question = e.target.value;
                                                                            setFaqList(updatedFaqList);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {faqList.length > 1 && index !== faqList.length - 1 ? (
                                                                <button type="button"
                                                                    className="btn btn-danger py-2"
                                                                    onClick={() => deleteFAQ(index)}>
                                                                    <FaTrash />
                                                                </button>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <Textarea
                                                            label="Answer"
                                                            className="form-control"
                                                            id="answer"
                                                            rows="4"
                                                            placeholder="Enter answer"
                                                            type="text"
                                                            name="answer"
                                                            value={faq.answer}
                                                            onChange={(e) => {
                                                                const updatedFaqList = [...faqList];
                                                                updatedFaqList[index].answer = e.target.value;
                                                                setFaqList(updatedFaqList);
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))} */}

                                        <Row className="g-3">
                                            <Row className="g-3">
                                                {states?.faqs?.map((faq, index) => (
                                                    <Fragment key={index + "faq"}>
                                                        <Col xl={12}>
                                                            <LableInput
                                                                label="Question"
                                                                className="form-control"
                                                                id={`faq[${index}][question]`}
                                                                placeholder="Enter the question"
                                                                type="text"
                                                                name={`faq[${index}][question]`}
                                                                value={faq.question || ''}
                                                                onChange={(e) => handleArrayChange('faqs', [
                                                                    ...states?.faqs?.slice(0, index),
                                                                    { ...faq, question: e.target.value },
                                                                    ...states?.faqs?.slice(index + 1)
                                                                ])}
                                                            />
                                                            {errors?.faqs?.[index]?.question && <SingleError error={errors?.faqs?.[index]?.question} />}
                                                        </Col>
                                                        <Col xl={12}>
                                                            <div className="d-flex align-items-end gap-2 w-100">
                                                                <div className="w-100">
                                                                    <label htmlFor={`faq[${index}][answer]`} className="form-label text-default">
                                                                        Answer<span className="star">*</span>
                                                                    </label>
                                                                    <div className="label-none">
                                                                        <Textarea
                                                                            label="Answer"
                                                                            rows="4"
                                                                            className="form-control"
                                                                            id={`faqs[${index}][answer]`}
                                                                            placeholder="Enter the answer"
                                                                            type="text"
                                                                            name={`faqs[${index}][answer]`}
                                                                            value={faq.answer || ''}
                                                                            onChange={(e) => handleArrayChange('faqs', [
                                                                                ...states?.faqs?.slice(0, index),
                                                                                { ...faq, answer: e.target.value },  // Only update answer
                                                                                ...states?.faqs?.slice(index + 1)
                                                                            ])}
                                                                        />
                                                                        {errors?.faqs?.[index]?.answer && <SingleError error={errors?.faqs?.[index]?.answer} />}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFAQ(index)}
                                                                    className="btn btn-danger py-2"
                                                                >
                                                                    <RiDeleteBinLine />
                                                                </button>
                                                            </div>
                                                        </Col>
                                                    </Fragment>
                                                ))}
                                                <Col md={12}>
                                                    <hr />
                                                </Col>
                                            </Row>

                                            <Col md={12}>
                                                <hr />
                                            </Col>
                                        </Row>


                                    </form>

                                    <div className="d-flex justify-content-between align-items-center">
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