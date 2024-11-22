import React, { useEffect } from 'react';
import Cookies from 'js-cookies';
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoute = (props) => {
    const { Component } = props
    const navigate = useNavigate()
    useEffect(() => {
        const adminToken = localStorage.getItem('adminJwtToken')
        if (!adminToken) {
            navigate('/login')
        }
    })
    return <Component />

};

export default AdminProtectedRoute;
