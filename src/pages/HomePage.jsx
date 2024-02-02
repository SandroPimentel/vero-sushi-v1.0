// HomePage.js
import React from 'react';
import Home from './sections/Home';
import About from './sections/About'
import Menu from './sections/Menu'
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Menu />
    </>
  );
};

export default HomePage;
