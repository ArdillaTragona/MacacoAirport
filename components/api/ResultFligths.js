import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ResultsScreen = ({ route }) => {
  const { origin, destination, departureDate, departureTime, travelerType } = route.params;
  const [token, setToken] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const response = await axios.post(
          'https://test.api.amadeus.com/v1/security/oauth2/token',
          new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': 'VJmY4VVxCX5vvxhPQWI9geG6J9LfGK2v', // Tu API Key
            'client_secret': 'MxtoA4It7umIJD92' // Tu API Secret
          }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        setToken(response.data.access_token);
        console.log("Token obtenido:", response.data.access_token);
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    getAuthToken();
  }, []);

  useEffect(() => {
    const getFlightAvailabilities = async () => {
      if (!origin || !destination || !departureDate || !departureTime) return;

      setLoading(true);

      try {
        const requestBody = {
          originDestinations: [
            {
              id: '1',
              originLocationCode: origin.toUpperCase(),
              destinationLocationCode: destination.toUpperCase(),
              departureDateTime: {
                date: departureDate,
                time: departureTime,
              },
            },
          ],
          travelers: [{ id: '1', travelerType }],
          sources: ['GDS'],
        };

        const response = await axios.post(
          'https://test.api.amadeus.com/v1/shopping/availability/flight-availabilities',
          requestBody,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFlights(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la disponibilidad de vuelos:', error);
        setLoading(false);
      }
    };

    if (token) {
      getFlightAvailabilities();
    }
  }, [token, origin, destination, departureDate, departureTime, travelerType]);

  const renderFlightItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Vuelo ID: {item.id}</Text>
      {/* Agrega aquí los detalles del vuelo como hiciste antes */}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando vuelos...</Text>
      ) : (
        <FlatList
          data={flights}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 8,
    marginVertical: 8,
  },
});

export default ResultsScreen;
