import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('fr', fr);

const mapContainerStyle = {
  height: '250px',
  width: '100%'
};

const center = {
  lat: 44.841225, // Utilisez la latitude de votre restaurant
  lng: -0.580036 // Utilisez la longitude de votre restaurant
};

const CustomerInfoForm = ({
  customerName, setCustomerName,
  customerEmail, setCustomerEmail,
  customerPhone, setCustomerPhone,
  customerAddress, setCustomerAddress, // Ajoutez ces deux lignes pour gérer l'adresse
  startDate, setStartDate,
  deliveryType, setDeliveryType,
  minDate, maxDate, filterWeekdays
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAi8mlgOvS2u0-AnZgEDFou54L4wZOOcc" // Remplacez par votre clé API
  });
  return (
    <div>
      <div>
        <label>Type de commande :</label>
        <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} required>
          <option value="à domicle">Livraison</option>
          <option value="à emporter">À emporter</option>
        </select>
      </div>
      <div>
        <label>Date de commande :</label>
        <DatePicker
          locale="fr"
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFormat="P"
          minDate={minDate}
          maxDate={maxDate}
          filterDate={filterWeekdays}
        />
      </div>
      <input
        type="text"
        placeholder="Nom"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={customerEmail}
        onChange={e => setCustomerEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Téléphone"
        value={customerPhone}
        onChange={e => setCustomerPhone(e.target.value)}
        required
      />
      {deliveryType === "à emporter" && isLoaded && !loadError && (
        <div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
          >
            <Marker
              position={center}
              onClick={() => window.open(`https://www.google.com/maps/place/${center.lat},${center.lng}`, '_blank')}
            />
          </GoogleMap>
        </div>
      )}
      {deliveryType === "à domicle" && (
        <input
          type="text"
          placeholder="Adresse de livraison"
          value={customerAddress}
          onChange={e => setCustomerAddress(e.target.value)}
          required
        />
      )}
    </div>
  );
};

export default CustomerInfoForm;
