import React, { useState, useEffect } from 'react';
import SushiBox from '../../components/SushiBox';
import menuData from '../../data/MenuData.json';
import '../../styles/pages/sections/Menu.scss';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].name);
  const [centeredCardIndex, setCenteredCardIndex] = useState(0);

  useEffect(() => {
        const sushiIndex = menuData.findIndex((sushi) => sushi.name === selectedCategory);
    setCenteredCardIndex(sushiIndex);
  }, [selectedCategory]);

 const handleCategoryClick = (category) => {
  const sushiIndex = menuData.findIndex((sushi) => sushi.name === category);
  setCenteredCardIndex(sushiIndex);
  setSelectedCategory(category);
};


  const handleSushiClick = (sushiName) => {
    console.log(`Sushi clicked: ${sushiName}`);
  };

  const cardIndices = [0, 1, 2];

  return (
    <div className='menu'>
      <div className='menu-overlay'></div>
      <div className="category-buttons">
        {menuData.map((sushi) => (
          <button
            key={sushi.name}
            onClick={() => handleCategoryClick(sushi.name)}
            className={selectedCategory === sushi.name ? 'active' : ''}
          >
            {sushi.name}
          </button>
        ))}
      </div>
      <div className="carousel-container">
        {cardIndices.map((index) => {
          const sushi = menuData[(centeredCardIndex + index - 1 + menuData.length) % menuData.length];
          const isSelected = selectedCategory === sushi.name;

          return (
            <SushiBox
              key={sushi.name}
              name={sushi.name}
              image={sushi.image}
              details={sushi.details}
              miniDescription={sushi.miniDescription}
              Prix={sushi.Prix}
              onClick={handleSushiClick}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
