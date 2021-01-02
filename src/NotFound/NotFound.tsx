import React from 'react';
import logo from '../autologo.png'
import './NotFound.scss';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="notFound">
      <div className="logo1"><img src={logo} className="appLogo" alt="logo" /></div>
      <div className="desc">
        <p className="font32 fontbold">404-Not Found</p>
        <p className="font18">Sorry the page you are looking for doesnot exist.</p>
        <p className="font18">You can always go back to the <Link to={`/`} className="ctacolor">homepage</Link>.</p>
      </div>
    </div>

  );
}

export default NavBar;
