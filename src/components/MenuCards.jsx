import React from 'react';
import '../styles/components/MenuCards.scss';

const MenuCards = ({ menu, onSelect, isSelected }) => {
  const { name, image, Description, Prix } = menu;

  return (
    <div className={`menu-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{Description}</p>
      <p>Prix: {Prix}€</p>
    </div>
  );
};

export default MenuCards;
