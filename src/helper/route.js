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
        path: "/portfolios",
        element: (
            <PrivateRoute>
                <Portfolios />
            </PrivateRoute>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/dashboard" />,
    },
];


