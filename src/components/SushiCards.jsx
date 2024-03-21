import React from 'react';
import '../styles/components/SushiCards.scss';

const SushiCards = ({ items, selectedItems, maxSelection, onSelectionChange }) => {
  const handleSelection = (item) => {
    if (selectedItems.length < maxSelection || selectedItems.includes(item)) {
      onSelectionChange(item);
    }
  };

  return (
    <div className="sushi-cards-container">
      {items.map((item) => (
        <div key={item.name} className={`sushi-card ${selectedItems.includes(item) ? 'selected' : ''}`} onClick={() => handleSelection(item)}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SushiCards;
