import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpiner from '../Components/LoadingSpiner';



const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const location = useLocation();

     if (loading) return <LoadingSpiner></LoadingSpiner>

    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRoute;