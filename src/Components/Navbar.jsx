import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {


const links = <>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/">Home</NavLink></li>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/jobs">All Jobs</NavLink></li>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/add-job">Add a Job</NavLink></li>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/accepted-task">My Accepted Tasks</NavLink></li>
    </>    

    return (
       <div>
        {links}
       </div>
    );
};

export default Navbar;