// Route-related imports
import { Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';
import '../style/poppins.css';

import Login from '../auth/Login';
import Home from '../pages/home/HomeIndex';

export default [

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/dashboard",
        element: <Home />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
];


