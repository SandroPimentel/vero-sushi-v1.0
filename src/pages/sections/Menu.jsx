import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajouté
import SushiBox from '../../components/SushiBox'; // Assurez-vous que ce composant est correctement importé
import menuData from '../../data/MenuData.json'; // Vérifiez le chemin d'accès au fichier JSON
import Slider from 'react-slick'; // Import de Slider depuis react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../../styles/pages/sections/Menu.scss'; // Vérifiez le chemin d'accès au fichier de styles

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].name);
  const sliderRef = useRef(null);
  const navigate = useNavigate(); // Initialisé ici

  // Configuration de Slider
  const settings = {
    infinite: true, // Permet de boucler sur les éléments du carrousel
    slidesToShow: 3, // Nombre d'éléments à afficher dans le carrousel
    centerMode: true, // Centre le slide actif
    slidesToScroll: 1, // Nombre d'éléments à défiler
    afterChange: current => setSelectedCategory(menuData[current].name) // Met à jour la catégorie sélectionnée après un changement de slide
  };

  // Gère les clics sur les catégories
  const handleCategoryClick = (categoryName) => {
    const index = menuData.findIndex(menu => menu.name === categoryName);
    setSelectedCategory(categoryName);
    sliderRef.current.slickGoTo(index); // Déplace le Slider vers l'élément sélectionné
  };

  const handleOrderClick = (menuName) => {
    navigate('/order', { state: { selectedMenuName: menuName } });
  };


  return (
    <div className='menu'>
      <div className="menu-category-buttons">
        {menuData.map((menu, index) => (
          <button
            key={menu.name}
            className={selectedCategory === menu.name ? 'active' : ''}
            onClick={() => handleCategoryClick(menu.name)}>
            {menu.name}
          </button>
        ))}
      </div>
      <Slider ref={sliderRef} {...settings}>
        {menuData.map((menu) => (
          <SushiBox
            key={menu.name}
            name={menu.name}
            image={menu.image}
            Description={menu.Description}
            details={menu.details}
            Prix={menu.Prix}
            onClick={handleCategoryClick}
            onOrderClick={() => handleOrderClick(menu.name)} // Nouveau : Gère le clic sur "Commander"
            isSelected={selectedCategory === menu.name}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Menu;
