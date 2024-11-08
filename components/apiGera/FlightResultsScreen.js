// FlightResultsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import FlightList, {
  iataToCity,
  formatDuration,
  formatDateTime,
} from "./FlightList";

const FlightResultsScreen = ({ route, navigation }) => {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    children,
    classOfService,
  } = route.params;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthToken = async () => {
    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "FGDVkGl25Y5YCPjlGWxG5JCfEEVWfXqN",
          client_secret: "rVxGDxaKm7BhAANl",
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      setError("Error al obtener el token");
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const fetchFlights = async () => {
      const token = await getAuthToken();
      if (!token) return;

      try {
        const outboundResponse = await axios.get(
          "https://test.api.amadeus.com/v2/shopping/flight-offers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              originLocationCode: origin,
              destinationLocationCode: destination,
              departureDate: departureDate,
              adults: adults,
              travelClass: classOfService,
              ...(children && { children }), // Solo se agrega si children tiene valor
            },
          }
        );
        const outboundFlights = outboundResponse.data.data;

        let returnFlights = [];
        if (returnDate) {
          const inboundResponse = await axios.get(
            "https://test.api.amadeus.com/v2/shopping/flight-offers",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                originLocationCode: destination,
                destinationLocationCode: origin,
                departureDate: returnDate,
                adults: adults,
                travelClass: classOfService,
                ...(children && { children }),
              },
            }
          );
          returnFlights = inboundResponse.data.data;
        }

        const combinedFlights = outboundFlights.map((outbound) => ({
          outbound,
          return: returnFlights.length ? returnFlights[0] : null,
        }));

        setFlights(combinedFlights);
        setLoading(false);
      } catch (error) {
        console.error("Error en la búsqueda de vuelos:", error);
        setError("Error en la búsqueda de vuelos");
        setLoading(false);
      }
    };

    fetchFlights();
  }, [
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    children,
    classOfService,
  ]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const handleFlightSelect = (outbound, returnFlight) => {
    navigation.navigate("NextScreen", {
      origin,
      destination,
      returnDate,
      adults,
      children,
      classOfService,
    });
  };

  return (
    <View style={styles.container}>
      <FlightList flights={flights} handleFlightSelect={handleFlightSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: {
    /* Estilos aquí */
  },
  error: { color: "red" },
});

export default FlightResultsScreen;
