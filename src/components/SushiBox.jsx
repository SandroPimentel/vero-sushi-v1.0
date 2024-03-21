import React from 'react';
import '../styles/components/SushiBox.scss';

const SushiBox = ({ name, image, details, Description, Prix, onClick, isSelected, onOrderClick }) => {
  const handleSushiClick = () => {
    onClick(name);
  };

  const classNames = `sushi-box ${isSelected ? 'card-clicked' : ''}`;

  const detailsList = details || [];

  return (
    <div className={classNames} onClick={handleSushiClick}>
      <div className='header'>
        <h3>{name}</h3>
        <div className='image-container'>
          <img src={image} alt={name} />
        </div>
      </div>
      <p className="mini-description">{Description}</p>
      <ul>
        {detailsList.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <div className='bottom'></div>
      <p className="price"> 
      <button className='Order-menu-button' onClick={onOrderClick}>Commander</button> 
      </p>
    </div>
  );
};

export default SushiBox;
