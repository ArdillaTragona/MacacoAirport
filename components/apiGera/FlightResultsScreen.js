// FlightResultsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const FlightResultsScreen = ({ route, navigation }) => {
  const { origin, destination, departureDate, returnDate, adults, children, classOfService } = route.params;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAuthToken = async () => {
    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': 'FGDVkGl25Y5YCPjlGWxG5JCfEEVWfXqN',
          'client_secret': 'rVxGDxaKm7BhAANl',
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      setError('Error al obtener el token');
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const fetchFlights = async () => {
      const token = await getAuthToken();
      if (!token) return;

      try {
        // Obtén vuelos de ida
        const outboundResponse = await axios.get(
          'https://test.api.amadeus.com/v2/shopping/flight-offers',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            params: {
              originLocationCode: origin,
              destinationLocationCode: destination,
              departureDate: departureDate,
              adults: adults,
              children: children,
              travelClass: classOfService,
            },
          }
        );

        // Almacena los vuelos de ida
        const outboundFlights = outboundResponse.data.data;

        let returnFlights = [];
        if (returnDate) {
          // Obtén vuelos de regreso si se proporciona la fecha de regreso
          const inboundResponse = await axios.get(
            'https://test.api.amadeus.com/v2/shopping/flight-offers',
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              params: {
                originLocationCode: destination,
                destinationLocationCode: origin,
                departureDate: returnDate,
                adults: adults,
                children: children,
                travelClass: classOfService,
              },
            }
          );

          // Almacena los vuelos de regreso
          returnFlights = inboundResponse.data.data;
        }

        // Combina los vuelos de ida y vuelta
        const combinedFlights = outboundFlights.map(outbound => ({
          outbound,
          return: returnFlights.length ? returnFlights[0] : null, // Asignar solo el primer vuelo de regreso
        }));

        setFlights(combinedFlights);
        setLoading(false);
      } catch (error) {
        console.error('Error en la búsqueda de vuelos:', error);
        setError('Error en la búsqueda de vuelos');
        setLoading(false);
      }
    };

    fetchFlights();
  }, [origin, destination, departureDate, returnDate, adults, children, classOfService]);

  const handleFlightSelect = (outbound, returnFlight) => {
    Alert.alert(
      'Vuelo Seleccionado',
      `Has seleccionado el vuelo de ${origin} a ${destination}. ¿Deseas buscar el vuelo de regreso?`,
      [
        {
          text: 'No',
          onPress: () => navigation.navigate('NextScreen'),
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => {
            navigation.navigate('ReturnFlightSearch', {
              origin: destination,
              destination: origin,
              departureDate: returnDate,
              adults,
              children,
              classOfService,
            });
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+)M/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    return `${hours}h ${minutes}m`;
  };

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



  

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const renderFlightItem = ({ item }) => {
    const { outbound, return: returnFlight } = item;
    const outboundSegments = outbound.itineraries[0].segments;
    const returnSegments = returnFlight ? returnFlight.itineraries[0].segments : [];

    const outboundPrice = outbound.travelerPricings[0].price.total;
    const returnPrice = returnFlight ? returnFlight.travelerPricings[0].price.total : 0;
    const totalPrice = convertToMXN(parseFloat(outboundPrice) + parseFloat(returnPrice));

    return (
      <TouchableOpacity
        style={styles.flightItem}
        activeOpacity={0.7}
        onPress={() => handleFlightSelect(outbound, returnFlight)}
      >
        <View style={styles.flightDetails}>
          <Text style={styles.airline}>Aerolinea: {outbound?.validatingAirlineCodes[0] || 'Desconocida'}</Text>
          <Text style={styles.flightType}>Vuelo de Salida</Text>
          <Text style={styles.flightNumber}>Numero de Vuelo: {outboundSegments[0]?.carrierCode + outboundSegments[0]?.number || 'N/A'}</Text>
          <Text style={styles.details}>
            Origen: {iataToCity[outboundSegments[0]?.departure?.iataCode] || outboundSegments[0]?.departure?.iataCode || 'Desconocido'} el {formatDateTime(outboundSegments[0]?.departure?.at)}
          </Text>
          {outboundSegments.length > 1 && (
            <View style={styles.stopovers}>
              <Text style={styles.stopoversTitle}>Escalas de Salida:</Text>
              {outboundSegments.slice(1).map((segment, index) => (
                <Text key={index} style={styles.stopover}>
                  Escala {index + 1}: de {iataToCity[segment.departure?.iataCode] || segment.departure?.iataCode || 'Desconocido'} a {iataToCity[segment.arrival?.iataCode] || segment.arrival?.iataCode || 'Desconocido'} el {formatDateTime(segment.departure?.at)}
                </Text>
              ))}
            </View>
          )}
          <Text style={styles.details}>
            Destino: {iataToCity[outboundSegments[outboundSegments.length - 1]?.arrival?.iataCode] || outboundSegments[outboundSegments.length - 1]?.arrival?.iataCode || 'Desconocido'} el {formatDateTime(outboundSegments[outboundSegments.length - 1]?.arrival?.at)}
          </Text>
          <Text style={styles.details}>Duracion: {formatDuration(outbound?.itineraries[0]?.duration) || 'Desconocida'}</Text>

          {returnFlight && (
            <>
              <Text style={styles.flightType}>Vuelo de Regreso</Text>
              <Text style={styles.flightNumber}>Numero de Vuelo de Regreso: {returnSegments[0]?.carrierCode + returnSegments[0]?.number || 'N/A'}</Text>
              <Text style={styles.details}>
                Origen: {iataToCity[returnSegments[0]?.departure?.iataCode] || returnSegments[0]?.departure?.iataCode || 'Desconocido'} el {formatDateTime(returnSegments[0]?.departure?.at)}
              </Text>
              {returnSegments.length > 1 && (
                <View style={styles.stopovers}>
                  <Text style={styles.stopoversTitle}>Escalas de Regreso:</Text>
                  {returnSegments.slice(1).map((segment, index) => (
                    <Text key={index} style={styles.stopover}>
                      Escala {index + 1}: de {iataToCity[segment.departure?.iataCode] || segment.departure?.iataCode || 'Desconocido'} a {iataToCity[segment.arrival?.iataCode] || segment.arrival?.iataCode || 'Desconocido'} el {formatDateTime(segment.departure?.at)}
                    </Text>
                  ))}
                </View>
              )}
              <Text style={styles.details}>
                Destino: {iataToCity[returnSegments[returnSegments.length - 1]?.arrival?.iataCode] || returnSegments[returnSegments.length - 1]?.arrival?.iataCode || 'Desconocido'} el {formatDateTime(returnSegments[returnSegments.length - 1]?.arrival?.at)}
              </Text>
              <Text style={styles.details}>Duracion: {formatDuration(returnFlight?.itineraries[0]?.duration) || 'Desconocida'}</Text>
            </>
          )}

          <Text style={styles.details}>Clase de Servicio: {outbound?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin || 'Desconocida'}</Text>
          <Text style={styles.price}>Precio Total: {totalPrice} MXN</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        renderItem={renderFlightItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  flightItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flightDetails: {
    paddingVertical: 10,
  },
  airline: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#007BFF',
  },
  flightType: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF5722',
    marginTop: 10,
  },
  flightNumber: {
    marginTop: 5,
    fontSize: 16,
    color: '#555',
  },
  details: {
    marginTop: 3,
    fontSize: 14,
    color: '#777',
  },
  stopovers: {
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  stopoversTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  stopover: {
    marginTop: 3,
    fontSize: 14,
    color: '#888',
  },
  price: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF5722',
  },
});

const convertToMXN = (amount) => {
  return (amount * 20).toFixed(2);
};

export default FlightResultsScreen;
