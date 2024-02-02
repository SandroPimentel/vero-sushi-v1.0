import React, { useEffect, useState } from 'react';
import '../../styles/pages/sections/Home.scss';
import { Link as RouterLink } from 'react-router-dom'; 
import { Link } from 'react-scroll';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const homeContent = document.querySelector('.home-content');
    const videoElement = document.querySelector('.home video');
    homeContent.classList.add('transition-triggered');
    videoElement.classList.add('transition-triggered');

    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`home ${isLoaded ? 'loaded' : ''}`}>
      <div className="overlay"></div>
      <div className='home-content'>
        <h1>Savourez l'art du sushi.</h1>
        <h3>Sushi frais, à emporter : une expérience gourmande à découvrir.</h3>
        <RouterLink className="order-button" to="/order">
          <button>Commander</button>
        </RouterLink>
      </div>
      <Link className="down-button" to="menu" smooth={true}>
        <span className={`icon ${isLoaded ? 'loaded' : ''}`}>
          <img src='assets/arrow.svg' className="arrow" alt="arrow" />
        </span>
        <span className="text">Menu</span>
      </Link>
      <video src="assets/home_sushi_video.mp4" autoPlay loop muted />
    </div>
  );
};

export default Home;
