// Route-related imports
import { Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';
import '../style/poppins.css';

import Login from '../auth/Login';
import Home from '../pages/home/HomeIndex';
import ProtectLoginRoute from './ProtectLoginRoute';
import PrivateRoute from './PrivateRoute';
import Testimonialsindex from '../pages/testimonials/Testimonialsindex';
import AddTestimonials from '../pages/testimonials/AddTestimonials';
import Portfolios from '../pages/Portfolios/Portfolios';
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
        path: "/portfolios",
        element: (
            <PrivateRoute>
                <Portfolios />
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
        path: "/categories",
        element: (
            <PrivateRoute>
                <CategoriesIndex />
            </PrivateRoute>
        ),
    },
    {
        path: "/categories-add",
        element: (
            <PrivateRoute>
                <CategoriesAdd />
            </PrivateRoute>
        ),
    },
    {
        path: "/categories-edit",
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
        path: "/blogs-list",
        element: (
            <PrivateRoute>
                <AddBlogList />
            </PrivateRoute>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/dashboard" />,
    },
];


