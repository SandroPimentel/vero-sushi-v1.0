import React from 'react';
import '../styles/components/Navbar.scss';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="nav-items-container">
        <ScrollLink className="nav-item" to="home" smooth={true}><img src="assets/home.svg"/><p>Accueil</p></ScrollLink>
        <ScrollLink className="nav-item" to="about" smooth={true}><img src="assets/about.svg"/><p>À Propos</p></ScrollLink>
        <ScrollLink className="nav-item" to="menu" smooth={true}><img src="assets/menu.svg"/><p>Menu</p></ScrollLink>
        <RouterLink className="nav-item" to="/order"><img src="assets/order.svg"/><p className='order-link'>Commander</p></RouterLink>
      </div>
    </nav>
  );
};

export default Navbar;