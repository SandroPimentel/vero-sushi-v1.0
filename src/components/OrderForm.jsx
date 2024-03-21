import React from 'react';
import emailjs from 'emailjs-com';

const OrderForm = ({ selectedMenu, selectedSushis, selectedRolls, selectedSupplements, supplementsData }) => {
  const sendEmail = (e) => {
    e.preventDefault();

    // Vérifiez si les suppléments sont définis
    if (!selectedSupplements) {
      console.log("Aucun supplément sélectionné.");
      return;
    }

    const supplementsText = Object.entries(selectedSupplements).map(([category, items]) => {
      if (category === 'baguettes') {
        return `${items} paires de baguettes`;
      } else {
        const itemTexts = Object.entries(items).map(([itemId, quantity]) => {
          const itemName = supplementsData[category].find(item => item.id === itemId)?.name || 'Inconnu';
          return `${quantity} ${itemName}`;
        }).join(', ');
        return itemTexts;
      }
    }).join('; ');

    console.log("Suppléments sélectionnés pour l'email:", supplementsText);

    const templateParams = {
      menu_name: selectedMenu.name,
      sushi_details: selectedSushis.map(sushi => sushi.name).join(', '),
      roll_details: selectedRolls.map(roll => roll.name).join(', '),
      supplements_details: supplementsText,
    };
      emailjs.send('service_rajg47g', 'template_ntdjnli', templateParams, 'UfhweSfdiAsFVbfNc')
        .then((response) => {
          console.log('Email successfully sent!', response);
          alert("Email envoyé avec succès !");
        }, (error) => {
          console.log('Failed to send email.', error);
          alert("L'envoi de l'email a échoué.");
        });
    };
  
    return (
      <form onSubmit={sendEmail}>
        <button type="submit">Envoyer la commande</button>
      </form>
    );
  };
  
export default OrderForm;
