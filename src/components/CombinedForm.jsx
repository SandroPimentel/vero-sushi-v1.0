/* global google */
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('fr', fr);

const mapContainerStyle = {
  height: '400px',
  width: '100%'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// Remplacer par vos vraies coordonnées
const center = {
  lat: 44.425806,
  lng: 1.440833,
};

const libraries = ['places'];

const getAvailableDates = () => {
  const today = new Date();
  const twoDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);

  if (twoDaysLater.getDay() === 1 || twoDaysLater.getDay() === 2) {
    twoDaysLater.setDate(twoDaysLater.getDate() + (3 - twoDaysLater.getDay()));
  }

  const twoWeeksLater = new Date(twoDaysLater.getFullYear(), twoDaysLater.getMonth(), twoDaysLater.getDate() + 14);
  return {
    minDate: twoDaysLater.toISOString().split('T')[0],
    maxDate: twoWeeksLater.toISOString().split('T')[0],
  };
};

const CombinedForm = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState(new Date(getAvailableDates().minDate));
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' ou 'pickup'
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAAi8mlgOvS2u0-AnZgEDFou54L4wZOOcc",
    libraries,
  });
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!isLoaded || deliveryType !== 'pickup') return;

    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({
      placeId: "ChIJbcVzb4GJrBIRs3tSd8h2El0",
    }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place.geometry) {
        setMarker({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
  }, [isLoaded, deliveryType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      deliveryType,
      date: startDate,
      orderTime: e.target.orderTime.value,
      lastName: e.target.lastName.value,
      firstName: e.target.firstName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      address: deliveryType === 'delivery' ? e.target.address.value : null,
    };
    onSubmit(formData);
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day >= 3 && day <= 6;
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-form">
      <h2>Informations de livraison</h2>
      <div>
        <label>Type de livraison</label>
        <select onChange={e => setDeliveryType(e.target.value)} required>
          <option value="delivery">Livraison</option>
          <option value="pickup">À emporter</option>
        </select>
      </div>
      <DatePickerComponent startDate={startDate} setStartDate={setStartDate} isWeekday={isWeekday} />
      <CommonFields />
      {deliveryType === 'delivery' && <AddressField />}
      {deliveryType === 'pickup' && isLoaded && !loadError && (
        <MapComponent marker={marker} />
      )}
    </form>
  );
};

const DatePickerComponent = ({ startDate, setStartDate, isWeekday }) => (
  <>
    <label>Date de commande</label>
    <DatePicker
      locale="fr"
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      filterDate={isWeekday}
      minDate={new Date(getAvailableDates().minDate)}
      maxDate={new Date(getAvailableDates().maxDate)}
      required
      showMonthDropdown
      useShortMonthInDropdown
    />
  </>
);


const CommonFields = () => (
  <>
    <div>
        <label>Heure de commande</label>
        <select name="orderTime" required>
          <option value="12:00">Midi - 12:00</option>
          <option value="19:00">Soir - 19:00</option>
        </select>
      </div>
      <div>
        <label>Nom</label>
        <input type="text" name="lastName" required />
      </div>
      <div>
        <label>Prénom</label>
        <input type="text" name="firstName" required />
      </div>
      <div>
        <label>Téléphone</label>
        <input type="tel" name="phone" required />
      </div>
      <div>
        <label>Adresse Email</label>
        <input type="email" name="email" required />
      </div>
  </>
);

const AddressField = () => (
  <>
    <label>Adresse</label>
    <input type="text" name="address" required />
  </>
);

const MapComponent = ({ marker }) => (
  <div style={mapContainerStyle}>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={marker || center}
      options={options}
    >
      {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
    </GoogleMap>
  </div>
);

export default CombinedForm;