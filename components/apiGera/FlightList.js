// FlightList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const iataToCity = {
    'AGU': 'Aguascalientes',
    'TIJ': 'Tijuana',
    'MEX': 'Ciudad de México',
    'NLU': 'Nuevo Laredo',
    'CVM': 'Ciudad Victoria',
    'CME': 'Ciudad del Carmen',
    'CUL': 'Culiacán',
    'CUN': 'Cancún',
    'SJD': 'Los Cabos',
    'LAP': 'La Paz',
    'CPE': 'Campeche',
    'TGZ': 'Tuxtla Gutiérrez',
    'PQM': 'Palenque',
    'CUU': 'Chihuahua',
    'CJS': 'Ciudad Juárez',
    'TRC': 'Torreón',
    'SLW': 'Saltillo',
    'CLQ': 'Colima',
    'DGO': 'Durango',
    'BJX': 'León',
    'ACA': 'Acapulco',
    'ZIH': 'Ixtapa-Zihuatanejo',
    'PCA': 'Pachuca',
    'GDL': 'Guadalajara',
    'PVR': 'Puerto Vallarta',
    'MLM': 'Morelia',
    'UPN': 'Uruapan',
    'CVJ': 'Cuernavaca',
    'TPQ': 'Tepic',
    'MTY': 'Monterrey',
    'OAX': 'Oaxaca',
    'PXM': 'Puerto Escondido',
    'HUX': 'Huatulco',
    'PBC': 'Puebla',
    'QRO': 'Querétaro',
    'CUN': 'Cancún',
    'CZM': 'Cozumel',
    'CTM': 'Chetumal',
    'SLP': 'San Luis Potosí',
    'CUL': 'Culiacán',
    'MZT': 'Mazatlán',
    'LMM': 'Los Mochis',
    'HMO': 'Hermosillo',
    'CEN': 'Ciudad Obregón',
    'GYM': 'Guaymas',
    'VSA': 'Villahermosa',
    'TAM': 'Tampico',
    'REX': 'Reynosa',
    'MAM': 'Matamoros',
    'TXA': 'Tlaxcala',
    'VER': 'Veracruz',
    'MTT': 'Minatitlán',
    'PAZ': 'Poza Rica',
    'MID': 'Mérida',
    'ZCL': 'Zacatecas'
};

const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+)M/);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  return `${hours}h ${minutes}m`;
};

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  return `${formattedDate} ${formattedTime}`;
};

const FlightList = ({ flights, handleFlightSelect }) => {
  return (
    flights.map((item) => {
      const { outbound, return: returnFlight } = item;
      const outboundSegments = outbound.itineraries[0].segments;
      const returnSegments = returnFlight ? returnFlight.itineraries[0].segments : [];

      const outboundPrice = outbound.travelerPricings[0].price.total;
      const returnPrice = returnFlight ? returnFlight.travelerPricings[0].price.total : 0;
      const totalPrice = parseFloat(outboundPrice) + parseFloat(returnPrice);

      return (
        <TouchableOpacity
          key={outbound.id}
          style={styles.flightItem}
          activeOpacity={0.7}
          onPress={() => handleFlightSelect(outbound, returnFlight)}
        >
          <View style={styles.flightDetails}>
            <Text style={styles.airline}>Aerolinea: {outbound?.validatingAirlineCodes[0] || 'Desconocida'}</Text>
            {/* Resto del contenido del vuelo */}
          </View>
        </TouchableOpacity>
      );
    })
  );
};

const styles = StyleSheet.create({
  flightItem: { /* Estilos aquí */ },
  flightDetails: { /* Estilos aquí */ },
  // Agrega los demás estilos necesarios
});

export default FlightList;
export { iataToCity, formatDuration, formatDateTime };
