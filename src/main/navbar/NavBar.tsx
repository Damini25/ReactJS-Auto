import React from 'react';
import logo from '../../autologo.png'
import './NavBar.scss';

function NavBar() {
  return (
    <div className="navbar">
      <div className="logo"><img src={logo} className="appLogo" alt="logo" /></div>
      <div className="navItems">
        <div className="item">Purchase</div>
        <div className="item">MyOrder</div>
        <div className="item">Sell</div>
      </div>
    </div>

  );
}

export default NavBar;
