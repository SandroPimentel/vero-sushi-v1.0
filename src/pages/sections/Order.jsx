import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MenuData from '../../data/MenuData.json';
import SushiData from '../../data/SushiData.json';
import SupplementsData from '../../data/SupplementsData.json';
import MenuCards from '../../components/MenuCards';
import Form from '../../components/Form.jsx';
import SupplementsCards from '../../components/SupplementsCards.jsx';
import SushiCards from '../../components/SushiCards.jsx';
import '../../styles/pages/sections/Order.scss';
import { useLocation } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedRolls, setSelectedRolls] = useState([]);
  const [selectedSushis, setSelectedSushis] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedAccompaniments, setSelectedAccompaniments] = useState([]);
  const [selectedBaguettes, setSelectedBaguettes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('');
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const menuName = selectedMenu ? MenuData[selectedMenu]?.name : "Aucun menu sélectionné";

    const saucesDescription = Object.entries(selectedSauces)
      .filter(([id, quantity]) => quantity > 0)
      .map(([id, quantity]) => `${SupplementsData.sauce.find(s => s.id === id)?.name}: ${quantity}`)
      .join(", ");

    const accompagnementsDescription = Object.entries(selectedAccompaniments)
      .filter(([id, quantity]) => quantity > 0)
      .map(([id, quantity]) => `${SupplementsData.accompagnements.find(a => a.id === id)?.name}: ${quantity}`)
      .join(", ");

    const baguettesDescription = Object.entries(selectedBaguettes)
      .filter(([id, quantity]) => quantity > 0)
      .map(([id, quantity]) => `${SupplementsData.baguettes.find(b => b.id === id)?.name}: ${quantity}`)
      .join(", ");

    const detailedOrderDetails = {
      menu: menuName,
      rolls: selectedRolls.join(", "),
      sushis: selectedSushis.join(", "),
      sauces: saucesDescription,
      accompagnements: accompagnementsDescription,
      baguettes: baguettesDescription,
    };

    setOrderDetails(detailedOrderDetails);
  }, [selectedMenu, selectedRolls, selectedSushis, selectedSauces, selectedAccompaniments, selectedBaguettes]);

  const selectMenu = (menuKey) => {
    setSelectedMenu(menuKey);
    setSelectedRolls([]);
    setSelectedSushis([]);
    setSelectedSauces([]);
    setSelectedAccompaniments([]);
    setSelectedBaguettes([]);
  };

  useEffect(() => {
    // Check if the location state exists and has the selectedMenuIndex property
    if (location.state && location.state.selectedMenuIndex !== undefined) {
      // Use the selected menu index to update the state
      selectMenu(location.state.selectedMenuIndex);
    }
  }, [location]);

  const toggleSelection = (itemName, selectedItems, setSelectedItems, maxItems) => {
    const currentIndex = selectedItems.indexOf(itemName);
    let newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      if (newSelectedItems.length < maxItems) {
        newSelectedItems.push(itemName);
      }
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const selectRoll = (rollName) => {
    toggleSelection(rollName, selectedRolls, setSelectedRolls, MenuData[selectedMenu]?.maxRolls || 0);
  };

  const selectSushi = (sushiName) => {
    toggleSelection(sushiName, selectedSushis, setSelectedSushis, MenuData[selectedMenu]?.maxSushis || 0);
  };

  const incrementAccompaniment = (accId) => {
    setSelectedAccompaniments(prev => ({
      ...prev,
      [accId]: (prev[accId] || 0) + 1
    }));
  };

  const decrementAccompaniment = (accId) => {
    setSelectedAccompaniments(prev => ({
      ...prev,
      [accId]: Math.max((prev[accId] || 0) - 1, 0)
    }));
  };

  const incrementBaguette = (baguetteId) => {
    setSelectedBaguettes(prev => ({
      ...prev,
      [baguetteId]: (prev[baguetteId] || 0) + 1
    }));
  };

  const decrementBaguette = (baguetteId) => {
    setSelectedBaguettes(prev => ({
      ...prev,
      [baguetteId]: Math.max((prev[baguetteId] || 0) - 1, 0)
    }));
  };

  const incrementSauce = (sauceId) => {
    setSelectedSauces(prev => ({
      ...prev,
      [sauceId]: (prev[sauceId] || 0) + 1
    }));
  };

  const decrementSauce = (sauceId) => {
    setSelectedSauces(prev => ({
      ...prev,
      [sauceId]: Math.max((prev[sauceId] || 0) - 1, 0)
    }));
  };

  const getValidDates = () => {
    const validDates = [];
    let currentDate = new Date();

    for (let i = 0; i < 14; i++) {
      if ([3, 4, 5, 6].includes(currentDate.getDay())) {
        validDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return validDates;
  };

  const validDates = getValidDates();

  useEffect(() => {
    setSelectedDate(validDates[0].toISOString());
  }, []);

  useEffect(() => {
    console.log("Selected date:", selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e) => {
    const newDateValue = e.target.value;
    if (validDates.some(date => date.toISOString() === newDateValue)) {
      setSelectedDate(newDateValue);
    } else {
      console.error("Date invalide sélectionnée");
    }
  };
  useEffect(() => {
    const menuPrice = selectedMenu ? MenuData[selectedMenu]?.Prix : 0;

    const saucesPrice = Object.entries(selectedSauces).reduce((total, [id, quantity]) => {
      const itemPrice = SupplementsData.sauce.find(s => s.id === id)?.Prix || 0;
      return total + (itemPrice * quantity);
    }, 0);

    const accompagnementsPrice = Object.entries(selectedAccompaniments).reduce((total, [id, quantity]) => {
      const itemPrice = SupplementsData.accompagnements.find(a => a.id === id)?.Prix || 0;
      return total + (itemPrice * quantity);
    }, 0);

    const baguettesPrice = Object.entries(selectedBaguettes).reduce((total, [id, quantity]) => {
      const itemPrice = SupplementsData.baguettes.find(b => b.id === id)?.Prix || 0;
      return total + (itemPrice * quantity);
    }, 0);

    const totalPrice = menuPrice + saucesPrice + accompagnementsPrice + baguettesPrice;

    setOrderDetails(prevDetails => ({
      ...prevDetails,
      totalPrice
    }));

  }, [selectedMenu, selectedSauces, selectedAccompaniments, selectedBaguettes, MenuData]);

  return (
    <div className="order">
      <RouterLink to="/" className="back-to-home">
        Retour à l'accueil
      </RouterLink>

      <div className="menu-selection">
        {Object.keys(MenuData).map((menuKey) => (
          <MenuCards
            key={menuKey}
            menu={MenuData[menuKey]}
            onSelect={() => selectMenu(menuKey)}
            isSelected={selectedMenu === menuKey}
          />
        ))}
      </div>
      <div className="rolls-selection">
        {SushiData.rolls.map((roll, index) => (
          <SushiCards
            key={index}
            item={roll}
            onSelect={() => selectRoll(roll.name)}
            isSelected={selectedRolls.includes(roll.name)}
            maxItems={selectedMenu ? MenuData[selectedMenu].maxRolls : 0}
          />
        ))}
      </div>

      <div className="sushis-selection">
        {SushiData.sushi.map((sushi, index) => (
          <SushiCards
            key={index}
            item={sushi}
            onSelect={() => selectSushi(sushi.name)}
            isSelected={selectedSushis.includes(sushi.name)}
            maxItems={selectedMenu ? MenuData[selectedMenu].maxSushis : 0}
          />
        ))}
      </div>
      <h2>Sauces</h2>
      {SupplementsData.sauce.map((supplement, index) => (
        <SupplementsCards
          key={supplement.id ? `sauce-${supplement.id}` : `sauce-index-${index}`}
          supplement={supplement}
          onIncrement={() => incrementSauce(supplement.id)}
          onDecrement={() => decrementSauce(supplement.id)}
          quantity={selectedSauces[supplement.id] || 0}
        />
      ))}
      {SupplementsData.accompagnements.map((supplement, index) => (
        <SupplementsCards
          key={supplement.id ? `accompaniment-${supplement.id}` : `accompaniment-index-${index}`}
          supplement={supplement}
          onIncrement={() => incrementAccompaniment(supplement.id)}
          onDecrement={() => decrementAccompaniment(supplement.id)}
          quantity={selectedAccompaniments[supplement.id] || 0}
        />
      ))}
      {SupplementsData.baguettes.map((supplement, index) => (
        <SupplementsCards
          key={supplement.id ? `baguette-${supplement.id}` : `baguette-index-${index}`}
          supplement={supplement}
          onIncrement={() => incrementBaguette(supplement.id)}
          onDecrement={() => decrementBaguette(supplement.id)}
          quantity={selectedBaguettes[supplement.id] || 0}
        />
      ))}
      <Form
        orderDetails={orderDetails}
        selectedRolls={selectedRolls}
        selectedSushis={selectedSushis}
        selectedSauces={selectedSauces}
        selectedAccompaniments={selectedAccompaniments}
        selectedBaguettes={selectedBaguettes}
        totalPrice={orderDetails.totalPrice}
        selectedDate={selectedDate}
        selectedTimeOfDay={selectedTimeOfDay}
      />
      <div className="date-selection">
        <label htmlFor="date">Retrait de ma commande le :</label>
        <select
          name="date"
          id="date"
          value={selectedDate} // Assurez-vous que cela correspond exactement à la valeur des options.
          onChange={handleDateChange}
        >
          {validDates.map((date, index) => (
  <option key={index} value={date.toISOString()}>
    {date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
  </option>
))}
        </select>
      </div>

      <div className="time-selection">
        <label htmlFor="timeOfDay">Heure :</label>
        <select
          name="timeOfDay"
          id="timeOfDay"
          value={selectedTimeOfDay}
          onChange={(e) => setSelectedTimeOfDay(e.target.value)}
        >
          <option value="midi">Midi</option>
          <option value="soir">Soir</option>
        </select>
      </div>

      <div className="total-price">
        Prix Total: {orderDetails.totalPrice} €
      </div>
    </div>
  );
};

export default Order;
