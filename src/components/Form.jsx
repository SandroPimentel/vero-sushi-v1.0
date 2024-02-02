import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import SupplementsData from '../data/SupplementsData.json'

const Form = ({ orderDetails, selectedSushis, selectedRolls, selectedSauces, selectedAccompaniments, selectedBaguettes,   totalPrice, selectedDate, 
selectedTimeOfDay,  }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');

  useEffect(() => {
    // Initialise emailjs avec votre userID
    emailjs.init('UfhweSfdiAsFVbfNc');
  }, []);

  
  
  
  
  const sendEmail = (e) => {
    e.preventDefault();
  
    // Ici, on suppose que `selectedSauces`, `selectedAccompaniments`, et `selectedBaguettes` sont des objets avec des ID comme clés et les quantités comme valeurs. Si ce ne sont pas des objets mais des listes d'ID, vous devrez adapter cette partie.
  
    // Convertir les ID en noms pour les Sauces
    const saucesNames = Object.entries(selectedSauces).map(([id, quantity]) =>
      `${SupplementsData.sauce.find((s) => s.id === id)?.name || id}: ${quantity}`
    ).join(", ");
  
    // Convertir les ID en noms pour les Accompagnements
    const accompagnementsNames = Object.entries(selectedAccompaniments).map(([id, quantity]) =>
      `${SupplementsData.accompagnements.find((a) => a.id === id)?.name || id}: ${quantity}`
    ).join(", ");
  
    // Convertir les ID en noms pour les Baguettes
    const baguettesNames = Object.entries(selectedBaguettes).map(([id, quantity]) =>
      `${SupplementsData.baguettes.find((b) => b.id === id)?.name || id}: ${quantity}`
    ).join(", ");

    const formattedDate = new Date(selectedDate).toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const orderDetailsStr = `
      Menu: ${orderDetails.menu}
      Rolls: ${selectedRolls.join(", ") || "Aucun"}
      Sushis: ${selectedSushis.join(", ") || "Aucun"}
      Sauces: ${saucesNames || "Aucune"}
      Accompagnements: ${accompagnementsNames || "Aucun"}
      Baguettes: ${baguettesNames || "Aucune"}
    `.trim(); // `.trim()` pour nettoyer les espaces au début et à la fin


    const orderDetailsWithPrice = `
      ${orderDetailsStr}
      Prix Total: ${totalPrice} €
      Date de Retrait: ${formattedDate}
      Heure de Retrait: ${selectedTimeOfDay === 'midi' ? '12:00' : '19:00'}
    `.trim();

    const templateParams = {
      from_name: customerName,
      from_email: customerEmail,
      phone_number: customerPhone,
      message: customerMessage,
      order_details: orderDetailsWithPrice,
    };
  
    emailjs.send('service_rajg47g', 'template_ntdjnli', templateParams)
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Commande envoyée avec succès!');
      }, err => {
        console.log('FAILED...', err);
        alert('Échec de l\'envoi de la commande.');
      });
  };

  return (
    <form className="order-form" onSubmit={sendEmail}>
      <input
        type="text"
        placeholder="Votre nom"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Votre email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Votre téléphone"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
      />
      <textarea
        placeholder="Votre message"
        value={customerMessage}
        onChange={(e) => setCustomerMessage(e.target.value)}
      />
      <button type="submit">Confirmer la commande</button>
    </form>
  );
};

export default Form;
