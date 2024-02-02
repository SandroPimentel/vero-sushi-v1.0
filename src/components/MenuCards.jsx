import React from 'react';
import '../styles/components/MenuCards.scss'

const MenuCards = ({ menu, onSelect, isSelected }) => {
  const { name, image, Description, Prix } = menu;

  const cardStyle = isSelected 
    ? { border: '2px solid blue' } // Style quand le menu est sélectionné
    : {}; 

  return (
    <div className="menu-card" style={cardStyle} onClick={onSelect}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{Description}</p>
      <p>Prix: {Prix}€</p>
    </div>
  );
};

export default MenuCards;
