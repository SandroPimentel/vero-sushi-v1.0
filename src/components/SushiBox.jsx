import React from 'react';
import '../styles/components/SushiBox.scss';

const SushiBox = ({ name, image, details, miniDescription, Prix, onClick, isSelected }) => {
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
      <p className="mini-description">{miniDescription}</p>
      <ul>
        {detailsList.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      {Prix !== null && Prix !== undefined && <p className="price"> <button className='Order-menu-button'>Commander</button> {Prix} €</p>}
    </div>
  );
};

export default SushiBox;
