import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import MenuCards from '../../components/MenuCards';
import SushiCards from '../../components/SushiCards';
import SupplementsCards from '../../components/SupplementsCards';
import CombinedDeliveryForm from '../../components/CombinedForm'; // Utilisation du formulaire combiné
import OrderForm from '../../components/OrderForm';
import '../../styles/pages/sections/OrderMenu.scss';
import importedMenuData from '../../data/MenuData.json';
import importedSushiData from '../../data/SushiData.json';
import importedSupplementsData from '../../data/SupplementsData.json';

const OrderMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSushis, setSelectedSushis] = useState([]);
  const [selectedRolls, setSelectedRolls] = useState([]);
  const [selectedSupplements, setSelectedSupplements] = useState({
    sauces: {},
    accompagnements: {},
    baguettes: 0,
  }); // Nouvel état pour les suppléments sélectionnés
  const [extraCost, setExtraCost] = useState(0);
  const location = useLocation();
  

  useEffect(() => {
    const menuNameFromState = location.state?.selectedMenuName;
    const menuInfo = importedMenuData.find(menu => menu.name === menuNameFromState);

    if (menuInfo) {
      setSelectedMenu(menuInfo);
    }
  }, [location]);

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedSushis([]);
    setSelectedRolls([]);
    setSelectedSupplements({
      sauces: {},
      accompagnements: {},
      baguettes: 0,
    }); // Réinitialiser les suppléments lors de la sélection d'un nouveau menu
  };

  const handleSushiSelection = (sushi) => {
    setSelectedSushis(prevSushis => toggleItemInArray(prevSushis, sushi));
  };

  const handleRollSelection = (roll) => {
    setSelectedRolls(prevRolls => toggleItemInArray(prevRolls, roll));
  };

  const toggleItemInArray = (array, item) => {
    const index = array.indexOf(item);
    return index > -1 ? array.filter((_, i) => i !== index) : [...array, item];
  };

  const handleCostChange = (newExtraCost) => {
    setExtraCost(newExtraCost);
  };

  const handleSubmitDelivery = (formData) => {
    // Traiter les données du formulaire de livraison ici
  };

  return (
    <div className="order">
      <RouterLink to="/" className="back-to-home">Retour à l'accueil</RouterLink>
      <MenuCards menuData={importedMenuData} onSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
      {selectedMenu && (
        <>
          <h2>Sélectionnez vos sushis (max {selectedMenu.maxSushis}):</h2>
          <SushiCards items={importedSushiData.sushi} selectedItems={selectedSushis} maxSelection={selectedMenu.maxSushis} onSelectionChange={handleSushiSelection} />
          <h2>Sélectionnez vos rolls (max {selectedMenu.maxRolls}):</h2>
          <SushiCards items={importedSushiData.rolls} selectedItems={selectedRolls} maxSelection={selectedMenu.maxRolls} onSelectionChange={handleRollSelection} />
          <SupplementsCards
            supplementsData={importedSupplementsData}
            menuSupplementsLimits={selectedMenu.supplementsLimits}
            onCostChange={handleCostChange}
            selectedSupplements={selectedSupplements}
            onSupplementsChange={setSelectedSupplements}
          />
        </>
      )}
      <p className='total-price'>Coût total : {selectedMenu ? selectedMenu.Prix + extraCost : 0}€</p>
      <CombinedDeliveryForm onSubmit={handleSubmitDelivery} />
      {selectedMenu && (
        <OrderForm
          selectedMenu={selectedMenu}
          selectedSushis={selectedSushis}
          selectedRolls={selectedRolls}
          selectedSupplements={selectedSupplements}
          supplementsData={importedSupplementsData}
        />
      )}
    </div>
  );
};

export default OrderMenu;
