
import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
       <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='max-w-screen-2xl w-full flex-1'>
                <Outlet />
            </div>
            <Footer></Footer>
            {/* <Toaster /> */}
        </div>
    );
};

export default MainLayout;