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
        path: "*",
        element: <Navigate to="/dashboard" />,
    },
];


