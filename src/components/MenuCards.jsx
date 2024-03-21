import React from 'react';
import '../styles/components/MenuCards.scss'

const MenuCards = ({ menuData, onSelectMenu, selectedMenu }) => {
  return (
    <div className='menus-cards-container'>
      {menuData.map((menu) => (
        <div key={menu.name} 
             className={`menu-card ${selectedMenu && selectedMenu.name === menu.name ? 'selected' : ''}`}
             onClick={() => onSelectMenu(menu)}>
          <img src={menu.image} alt={menu.name} />
          <h3>{menu.name}</h3>
          <p>{menu.Description}</p>
        </div>
      ))}
    </div>
  );
};


export default MenuCards