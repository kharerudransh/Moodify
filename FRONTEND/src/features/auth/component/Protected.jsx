import React from 'react'
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from 'react-router';
import Loader from './Loader';
import { Navigate } from 'react-router';

const Protected = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    if (loading) {
        return <Loader/>
    }
    if (!user) {
        return <Navigate to='/login'/>
    }
    return (
        <>{children}</>
    )
}

export default Protected