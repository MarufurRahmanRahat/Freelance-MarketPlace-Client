import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { DiSenchatouch } from 'react-icons/di';
import { SiFreelancermap } from 'react-icons/si';

const Navbar = () => {

    const { user, signOutUSer } = use(AuthContext)

    const handleSignOut = () => {
        signOutUSer()
            .then(() => {

            })
            .catch(error => {
                console.log(error)
            })
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };



const links = <>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/">Home</NavLink></li>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/jobs">All Jobs</NavLink></li>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/add-job">Add a Job</NavLink></li>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/accepted-task">My Accepted Tasks</NavLink></li>
        <li><NavLink className='text-[20px] text-[#363b3f] font-sans' to="/my-posted-job">My Posted Jobs</NavLink></li>
    </>    

    return (
       <div className="navbar bg-base-100 shadow-sm p-3 sm:p-8 md:px-14 lg:px-20 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div className="flex justify-center items-center">
                    <Link to='/'><SiFreelancermap className='w-9 h-9 ' /></Link>
                    <Link to='/' className=" hidden sm:block text-2xl font-semibold ml-1">Freelance<br/>MarketPlace</Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="">
                    <div className="dropdown dropdown-hover mr-4 pt-2 ">
                        <div tabIndex={0}  className="outline-none cursor-pointer w-12 rounded-full  ">
                            <img className='w-12 rounded-full ' src={`${user && user.photoURL }`} referrerPolicy='no-referrer' alt=''></img>
                        </div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box  w-32 p-2 shadow-sm z-10">
                            <li><a className='text-red-900'>{`${user && user.displayName}`}</a></li>
                           
                        </ul>
                    </div>
                </div>
                {
                    user ? <a onClick={handleSignOut} className="btn text-[16px]">Log out</a>
                        : <>
                            <Link className='btn mr-1 text-[16px]' to='/login'>Login</Link>
                            <Link className='btn text-[16px]' to='/signup'>SignUp</Link>
                        </>
                }
               
            </div>
             <input
           onChange={(e) => handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle ml-1"/>
        </div>
    );
};

export default Navbar;