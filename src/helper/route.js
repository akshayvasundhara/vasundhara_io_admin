// Route-related imports
import { Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';
import '../style/poppins.css';

import Login from '../auth/Login';
import Home from '../pages/home/HomeIndex';
import ProtectLoginRoute from './ProtectLoginRoute';
import ProtectedRoute from './ProtectedRoute';
import PrivateRoute from './PrivateRoute';
import Testimonialsindex from '../pages/testimonials/Testimonialsindex';
import AddTestimonials from '../pages/testimonials/AddTestimonials';
import Portfolios from '../pages/Portfolios/Portfolios';
import HiringIndex from '../pages/Hirings/HiringIndex';
import AddHirings from '../pages/Hirings/AddHirings';
import ViewHirings from '../pages/Hirings/ViewHirings';

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
        path: "*",
        element: <Navigate to="/dashboard" />,
    },
];


