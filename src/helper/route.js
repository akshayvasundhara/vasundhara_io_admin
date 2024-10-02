// Route-related imports
import { Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';
import '../style/poppins.css';
import 'ckeditor5/ckeditor5.css';

import Login from '../auth/Login';
import Home from '../pages/home/HomeIndex';
import ProtectLoginRoute from './ProtectLoginRoute';
import PrivateRoute from './PrivateRoute';
import Testimonialsindex from '../pages/testimonials/Testimonialsindex';
import AddTestimonials from '../pages/testimonials/AddTestimonials';
import HiringIndex from '../pages/Hirings/HiringIndex';
import AddHirings from '../pages/Hirings/AddHirings';
import ViewHirings from '../pages/Hirings/ViewHirings';
import ApplyJobs from '../pages/ApplyJobs/ApplyJobs';
import TeamsIndex from '../pages/Teams/TeamsIndex';
import TeamsAdd from '../pages/Teams/TeamsAdd';
import FaqsIndex from '../pages/Faq/FaqsIndex';
import FaqsAdd from '../pages/Faq/FaqsAdd';
import CategoriesIndex from '../pages/Categories/CategoriesIndex';
import CategoriesAdd from '../pages/Categories/CategoriesAdd';
import BlogsListIndex from '../pages/Blogs/BlogsListIndex';
import AddBlogList from '../pages/Blogs/AddBlogList';
import ContactUsIndex from '../pages/ContactUs/ContactUsIndex';
import ContactUsIndexView from '../pages/ContactUs/ContactUsIndexView';
import NewslettersIndex from '../pages/Newsletters/NewslettersIndex';
import BlogIndexView from '../pages/Blogs/BlogIndexView';
import CaseStudiesIndex from '../pages/CaseStudies/CaseStudiesIndex';
import AddCaseStudiesIndex from '../pages/CaseStudies/AddCaseStudiesIndex';
import ViewCaseStudiesIndex from '../pages/CaseStudies/ViewCaseStudiesIndex';
import IndexPortfolio from '../pages/Portfolio/IndexPortfolio';
import IndexPortfolioEdit from '../pages/Portfolio/IndexPortfolioEdit';
import ViewIndexPortfolio from '../pages/Portfolio/ViewIndexPortfolio';

export default [
    {
        path: "/login",
        element: (
            <ProtectLoginRoute>
                <Login />
            </ProtectLoginRoute>
        ),
    },

    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        ),
    },

    {
        path: "/testimonials",
        element: (
            <PrivateRoute>
                <Testimonialsindex />
            </PrivateRoute>
        ),
    },
    {
        path: "/testimonials-add",
        element: (
            <PrivateRoute>
                <AddTestimonials />
            </PrivateRoute>
        ),
    },
    {
        path: "/testimonials-edit",
        element: (
            <PrivateRoute>
                <AddTestimonials />
            </PrivateRoute>
        ),
    },
    {
        path: "/portfolio",
        element: (
            <PrivateRoute>
                <IndexPortfolio />
            </PrivateRoute>
        ),
    },
    {
        path: "/portfolio-add",
        element: (
            <PrivateRoute>
                <IndexPortfolioEdit />
            </PrivateRoute>
        ),
    },
    {
        path: "/portfolio-edit",
        element: (
            <PrivateRoute>
                <IndexPortfolioEdit />
            </PrivateRoute>
        ),
    },
    {
        path: "/portfolio-view",
        element: (
            <PrivateRoute>
                <ViewIndexPortfolio />
            </PrivateRoute>
        ),
    },
    {
        path: "/hirings",
        element: (
            <PrivateRoute>
                <HiringIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/hirings-add",
        element: (
            <PrivateRoute>
                <AddHirings />
            </PrivateRoute>
        ),
    },
    {
        path: "/hirings-edit",
        element: (
            <PrivateRoute>
                <AddHirings />
            </PrivateRoute>
        ),
    },
    {
        path: "/hirings-view",
        element: (
            <PrivateRoute>
                <ViewHirings />
            </PrivateRoute>
        ),
    },
    {
        path: "/apply-jobs",
        element: (
            <PrivateRoute>
                <ApplyJobs />
            </PrivateRoute>
        ),
    },
    {
        path: "/teams",
        element: (
            <PrivateRoute>
                <TeamsIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/teams-add",
        element: (
            <PrivateRoute>
                <TeamsAdd />
            </PrivateRoute>
        ),
    },
    {
        path: "/teams-edit",
        element: (
            <PrivateRoute>
                <TeamsAdd />
            </PrivateRoute>
        ),
    },
    {
        path: "/faqs",
        element: (
            <PrivateRoute>
                <FaqsIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/faqs-add",
        element: (
            <PrivateRoute>
                <FaqsAdd />
            </PrivateRoute>
        ),
    },
    {
        path: "/faqs-edit",
        element: (
            <PrivateRoute>
                <FaqsAdd />
            </PrivateRoute>
        ),
    },
    {
        path: "/category",
        element: (
            <PrivateRoute>
                <CategoriesIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/category-add",
        element: (
            <PrivateRoute>
                <CategoriesAdd />
            </PrivateRoute>
        ),
    },
    {
        path: "/category-edit",
        element: (
            <PrivateRoute>
                <CategoriesAdd />
            </PrivateRoute>
        ),
    },
    {
        path: "/blogs-list",
        element: (
            <PrivateRoute>
                <BlogsListIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/blogs-list-add",
        element: (
            <PrivateRoute>
                <AddBlogList />
            </PrivateRoute>
        ),
    },
    {
        path: "/blogs-list-edit",
        element: (
            <PrivateRoute>
                <AddBlogList />
            </PrivateRoute>
        ),
    },
    {
        path: "/blogs-details",
        element: (
            <PrivateRoute>
                <BlogIndexView />
            </PrivateRoute>
        ),
    },
    {
        path: "/contact-us",
        element: (
            <PrivateRoute>
                <ContactUsIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/contact-us-view",
        element: (
            <PrivateRoute>
                <ContactUsIndexView />
            </PrivateRoute>
        ),
    },
    {
        path: "/newsletters",
        element: (
            <PrivateRoute>
                <NewslettersIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/case-studies",
        element: (
            <PrivateRoute>
                <CaseStudiesIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/case-studies-add",
        element: (
            <PrivateRoute>
                <AddCaseStudiesIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/case-studies-edit",
        element: (
            <PrivateRoute>
                <AddCaseStudiesIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/case-studies-details",
        element: (
            <PrivateRoute>
                <ViewCaseStudiesIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/dashboard" />,
    },
];


