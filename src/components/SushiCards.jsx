import React from 'react';
import '../styles/components/SushiCards.scss'

const SushiCards = ({ item, onSelect, isSelected, maxItems }) => {
  const { name, image, description } = item;

  return (
    <div className={`sushi-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default SushiCards;
