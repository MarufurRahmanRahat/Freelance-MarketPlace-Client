import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Error from '../Pages/Error';
import Home from '../Pages/Home';
import Signin from '../Pages/Signin';
import Login from '../Pages/Login';
import Jobs from '../Pages/Jobs';
import Update from '../Pages/Update';
import JobDetails from '../Pages/JobDetails';
import AddJob from '../Pages/AddJob';
import AcceptedTask from '../Pages/AcceptedTask';
import PrivateRoute from './PrivateRoute';
import MyPostedJobs from '../Pages/MyPostedJobs';

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        // errorElement: <Error></Error>,

        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "signup",
                Component: Signin
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: '/jobs',
                element:<PrivateRoute><Jobs></Jobs></PrivateRoute> 
            },
            {
                path: '/update/:id',
                Component: Update
            },
            {
                path: '/job-details/:id',
                Component: JobDetails
            },
            {
                path: '/add-job',
                Component: AddJob
            },
            {
                path: '/accepted-task',
                Component: AcceptedTask
            },
            {
                path: '/my-posted-job',
                Component: MyPostedJobs
            },
            






            // {
            //     path: '/app-details/:id',
            //     element: <Privateroute><Appdetails /></Privateroute>
            // },
            // {
            //     path: '/myprofile',
            //     element: <Privateroute><Myprofile></Myprofile></Privateroute>,
            // },



        ]
    },


])

export default router;