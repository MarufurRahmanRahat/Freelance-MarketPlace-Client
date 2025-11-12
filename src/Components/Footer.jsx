import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { SiFreelancermap } from 'react-icons/si';
import { Link } from 'react-router';


const Footer = () => {
    return (
<footer className="footer footer-horizontal footer-center p-10">
  <aside>
    <SiFreelancermap className='h-13 w-13' />
    <p className="font-bold">
      Freelance MarketPlace
      <br />
      Providing reliable sources to you
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
        <Link to='https://x.com/'><FaXTwitter className='h-6 w-6' /></Link>
      </a>
      <a>
        <Link to='https://www.youtube.com/'><IoLogoYoutube className='h-6 w-6' /></Link>
      </a>
      <a>
        <Link to='https://www.facebook.com/'><FaFacebook className='h-6 w-6' /></Link>
      </a>
    </div>
  </nav>
</footer>
    );
};

export default Footer;