import React from 'react';
import '../styles/components/SupplementsCards.scss';

const SupplementsCards = ({ supplement, onIncrement, onDecrement, quantity }) => {
  const { name, image, description, id } = supplement;

  return (
    <div className="supplement-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="quantity-controls">
        <button onClick={() => onDecrement(id)}>-</button>
        <span className="quantity">{quantity}</span> {/* Ajoutez ceci pour afficher la quantité */}
        <button onClick={() => onIncrement(id)}>+</button>
      </div>
    </div>
  );
};


export default SupplementsCards;
