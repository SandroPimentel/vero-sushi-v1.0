import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import MenuCards from '../../components/MenuCards';
import SushiCards from '../../components/SushiCards';
import SupplementsCards from '../../components/SupplementsCards';
import CustomerInfoForm from '../../components/CustomerinfoForm';
import '../../styles/pages/sections/OrderMenu.scss';
import importedMenuData from '../../data/MenuData.json';
import importedSushiData from '../../data/SushiData.json';
import importedSupplementsData from '../../data/SupplementsData.json';
import emailjs from 'emailjs-com';



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
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [customerAddress, setCustomerAddress] = useState('');


  // Fonction pour gérer la soumission de toutes les informations
  const handleOrderSubmit = () => {

    let supplementsDetails = '';

    // Construction des détails pour les sauces
    for (const [id, count] of Object.entries(selectedSupplements.sauces)) {
      if (count > 0) {
        const sauce = importedSupplementsData.sauces.find(item => item.id === id);
        supplementsDetails += `${sauce.name}: ${count}, `;
      }
    }
  
    // Construction des détails pour les accompagnements
    for (const [id, count] of Object.entries(selectedSupplements.accompagnements)) {
      if (count > 0) {
        const accompagnement = importedSupplementsData.accompagnements.find(item => item.id === id);
        supplementsDetails += `${accompagnement.name}: ${count}, `;
      }
    }
  
    // Ajout du nombre de baguettes
    if (selectedSupplements.baguettes > 0) {
      supplementsDetails += `Baguettes: ${selectedSupplements.baguettes}`;
    }
  
    // Suppression de la dernière virgule et espace, si nécessaire
    if (supplementsDetails.endsWith(', ')) {
      supplementsDetails = supplementsDetails.slice(0, -2);
    }

    const templateParams = {
      menu_name: selectedMenu ? selectedMenu.name : 'Menu non sélectionné',
      sushi_details: selectedSushis.map(sushi => sushi.name).join(', '),
      roll_details: selectedRolls.map(roll => roll.name).join(', '),
  supplements_details: supplementsDetails, // Utilisation de la chaîne construite
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      delivery_type: deliveryType,
      delivery_date: startDate.toISOString().split('T')[0],
      customer_address: deliveryType === 'à domicle' ? customerAddress : 'Aucune Adresse',
    };

    // Envoyer l'email avec emailjs
    emailjs.send('service_rajg47g', 'template_ntdjnli', templateParams, 'UfhweSfdiAsFVbfNc')
      .then((response) => {
        console.log('Email successfully sent!', response);
        alert("Commande envoyée avec succès !");
      }, (error) => {
        console.log('Failed to send email.', error);
        alert("Échec de l'envoi de la commande.");
      });
  };

  useEffect(() => {
    const menuNameFromState = location.state?.selectedMenuName;
    const menuInfo = importedMenuData.find(menu => menu.name === menuNameFromState);

    if (menuInfo) {
      setSelectedMenu(menuInfo);
    }
  }, [location]);

  const getAvailableDates = () => {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + 2);

    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 14);

    return { startDate, endDate };
  };

  const { startDate: minDate, endDate: maxDate } = getAvailableDates();

  const filterWeekdays = date => {
    const day = date.getDay();
    return day >= 3 && day <= 6;
  };

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedSushis([]);
    setSelectedRolls([]);
    setSelectedSupplements({
      sauces: {},
      accompagnements: {},
      baguettes: 0,
    });
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

  const handleTestOrder = () => {
    console.log("Test des informations de la commande :");
  
    // Informations du client
    console.log(`Nom du client : ${customerName}`);
    console.log(`Email du client : ${customerEmail}`);
    console.log(`Téléphone du client : ${customerPhone}`);
    console.log(`Type de livraison : ${deliveryType}`);
    console.log(`Date de la livraison : ${startDate.toISOString().split('T')[0]}`);
    console.log(`Adresse de livraison : ${customerAddress}`);
  
    // Détails des suppléments
    const supplementDetails = Object.entries(selectedSupplements).map(([category, items]) => {
      if (category === 'baguettes') {
        return `Baguettes: ${items}`;
      } else {
        const itemDetails = Object.entries(items).map(([itemId, count]) => {
          const itemName = importedSupplementsData[category].find(item => item.id === itemId)?.name || 'Inconnu';
          return `${itemName}: ${count}`;
        }).join(', ');
        return `${category.charAt(0).toUpperCase() + category.slice(1)}: ${itemDetails}`;
      }
    }).join('; ');
  
    console.log(`Suppléments : ${supplementDetails}`);
  
    // Détails de la commande
    console.log(`Menu sélectionné : ${selectedMenu ? selectedMenu.name : 'Non sélectionné'}`);
    console.log(`Sushis sélectionnés : ${selectedSushis.map(sushi => sushi.name).join(', ')}`);
    console.log(`Rolls sélectionnés : ${selectedRolls.map(roll => roll.name).join(', ')}`);
    console.log(`Coût supplémentaire : ${extraCost}€`);
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
      <CustomerInfoForm
        customerName={customerName} setCustomerName={setCustomerName}
        customerEmail={customerEmail} setCustomerEmail={setCustomerEmail}
        customerPhone={customerPhone} setCustomerPhone={setCustomerPhone}
        customerAddress={customerAddress} setCustomerAddress={setCustomerAddress}
        startDate={startDate} setStartDate={setStartDate}
        deliveryType={deliveryType} setDeliveryType={setDeliveryType}
        minDate={minDate}
        maxDate={maxDate}
        filterWeekdays={filterWeekdays}
      />
      <button onClick={handleOrderSubmit}>Envoyer la commande</button>
      <button onClick={handleTestOrder}>Tester les informations de la commande</button>
    </div>
  );  
};

export default OrderMenu;
