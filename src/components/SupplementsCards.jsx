import React, { useState, useEffect } from 'react';
import '../styles/components/SupplementsCards.scss';

const SupplementsCards = ({ supplementsData, menuSupplementsLimits, onCostChange, onSupplementsChange }) => {
  const [selectedSupplements, setSelectedSupplements] = useState({
    sauces: {},
    accompagnements: {},
    baguettes: 0,
  });

  // Utilisez useState pour stocker le coût supplémentaire localement
  const [localExtraCost, setLocalExtraCost] = useState(0);

  // Déplacez la logique de calcul du coût supplémentaire dans useEffect
  useEffect(() => {
    let extraCost = 0;

    const calculateCategoryCost = (category, data) => {
      const categorySelection = selectedSupplements[category];
      const limit = menuSupplementsLimits[category]?.free || 0;
      let totalSelected = category === 'baguettes' ? categorySelection : Object.values(categorySelection).reduce((acc, count) => acc + count, 0);

      if (totalSelected > limit) {
        extraCost += (totalSelected - limit) * (category === 'baguettes' ? data.Prix : data[0].Prix);
      }
    };

    calculateCategoryCost('sauces', supplementsData.sauces);
    calculateCategoryCost('accompagnements', supplementsData.accompagnements);
    calculateCategoryCost('baguettes', supplementsData.baguettes[0]); // Assurez-vous que supplementsData.baguettes[0] existe et contient l'objet baguette avec un prix

    setLocalExtraCost(extraCost);
  }, [selectedSupplements, supplementsData, menuSupplementsLimits]);

  useEffect(() => {
    onCostChange(localExtraCost);
  }, [localExtraCost, onCostChange]);

  const handleSelectSupplement = (category, item, count) => {
    setSelectedSupplements(prev => {
      const newCategorySelection = { ...prev[category] };
      if (count > 0) {
        newCategorySelection[item.id] = count;
      } else {
        delete newCategorySelection[item.id];
      }
  
      const newSelection = { ...prev, [category]: newCategorySelection };
      console.log("Mise à jour des suppléments :", newSelection);
      onSupplementsChange(newSelection);
      return newSelection;
    });
  };

  const handleSelectBaguettes = (count) => {
    if (count >= 0 && count <= menuSupplementsLimits.baguettes.max) {
      setSelectedSupplements(prevSupplements => {
        const newSupplements = { ...prevSupplements, baguettes: count };
        console.log("Mise à jour des suppléments (baguettes) :", newSupplements);
        onSupplementsChange(newSupplements);
        return newSupplements;
      });
    }
  };


  const renderSupplements = (category) => (
    <div className="supplements-category">
      <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <div className="supplements-card">
        {supplementsData[category].map(item => (
          <div key={item.id} className="supplement-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <div className="quantity-selector">
              <button onClick={() => handleSelectSupplement(category, item, ((selectedSupplements[category] ?? {})[item.id] || 0) - 1)}>-</button>
              <span>{(selectedSupplements[category] ?? {})[item.id] || 0}</span>
              <button onClick={() => handleSelectSupplement(category, item, ((selectedSupplements[category] ?? {})[item.id] || 0) + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Rendu pour la sélection des baguettes
// Rendu pour la sélection des baguettes
// Rendu pour la sélection des baguettes
const renderBaguettesSelector = () => (
  <div className="baguettes-category">
    <h3>Baguettes</h3>
    <div className="supplements-card">
      {/* Assurez-vous que supplementsData.baguettes contient les données correctes, y compris l'image */}
      {supplementsData.baguettes.map(item => (
        <div key={item.id} className="supplement-card">
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <div className="quantity-selector">
            <button onClick={() => handleSelectBaguettes(selectedSupplements.baguettes - 1)}>-</button>
            <span>{selectedSupplements.baguettes}</span>
            <button onClick={() => handleSelectBaguettes(selectedSupplements.baguettes + 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


  return (
    <div className="supplements-cards">
      {renderSupplements('sauces')}
      {renderSupplements('accompagnements')}
      {renderBaguettesSelector()} {/* Ajout du sélecteur de baguettes */}
    </div>
  );
};

export default SupplementsCards;
