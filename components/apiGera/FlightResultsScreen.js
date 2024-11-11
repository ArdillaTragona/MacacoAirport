// FlightResultsScreen.js
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import iataToCity from "../data/iataCyty";
import axios from "axios";
import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const FlightResultsScreen = ({ route, navigation }) => {
  const {
    adults,
    origin,
    children,
    returnDate,
    destination,
    departureDate,
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

      console.log("Parámetros de búsqueda:", {
        origin,
        destination,
        departureDate,
        adults,
        children,
        travelClass: classOfService,
      });

      try {
        // Obtén vuelos de ida
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
              children: children,
              travelClass: classOfService,
            },
          }
        );

        // Almacena los vuelos de ida
        const outboundFlights = outboundResponse.data.data;
        console.log("Vuelos de ida:", outboundFlights);

        let returnFlights = [];
        if (returnDate) {
          // Obtén vuelos de regreso si se proporciona la fecha de regreso
          const inboundResponse = await axios.get(
            "https://test.api.amadeus.com/v2/shopping/flight-offers",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                destinationLocationCode: origin,
                originLocationCode: destination,
                travelClass: classOfService,
                departureDate: returnDate,
                children: children,
                adults: adults,
              },
            }
          );

          // Almacena los vuelos de regreso
          returnFlights = inboundResponse.data.data;
          console.log("Vuelos de regreso:", returnFlights);
        }

        // Combina los vuelos de ida y vuelta
        const combinedFlights = outboundFlights.map((outbound) => ({
          outbound,
          return: returnFlights.length ? returnFlights[0] : null, // Asignar solo el primer vuelo de regreso
        }));

        console.log("Vuelos combinados:", combinedFlights);

        if (combinedFlights.length === 0) {
          setError("No se encontraron vuelos para la búsqueda especificada.");
        }

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

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+)M/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    return `${hours}h ${minutes}m`;
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const renderFlightItem = ({ item }) => {
    const { outbound, return: returnFlight } = item;
    const outboundSegments = outbound.itineraries[0].segments;
    const returnSegments = returnFlight
      ? returnFlight.itineraries[0].segments
      : [];

    const outboundPrice = outbound.travelerPricings[0].price.total;
    const returnPrice = returnFlight
      ? returnFlight.travelerPricings[0].price.total
      : 0;
    const totalPrice = convertToMXN(
      parseFloat(outboundPrice) + parseFloat(returnPrice)
    );

    return (
      <TouchableOpacity
        style={styles.flightItem}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Passenger", {
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
            children,
            classOfService,
          })
        }
      >
        <View style={styles.containerRow}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            Airline: {outbound?.validatingAirlineCodes[0] || "Desconocida"}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "#7BD5FFFF", fontSize: 13 }}>
              Departure flight
            </Text>
            <MaterialCommunityIcons
              name="airplane-takeoff"
              size={20}
              color="#7BD5FFFF"
            />
          </View>
        </View>

        <View style={styles.containerRowData}>
          <Text style={{ color: "#535353FF" }}>
            Flight number:{" "}
            {outboundSegments[0]?.carrierCode + outboundSegments[0]?.number ||
              "N/A"}
          </Text>
          <Text style={styles.details}>
            Duration:{" "}
            {formatDuration(outbound?.itineraries[0]?.duration) ||
              "Desconocida"}
          </Text>
        </View>

        <View style={styles.containerRowData}>
          <View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text style={styles.details}>Origin:</Text>
              <Text style={{}}>
                {iataToCity[outboundSegments[0]?.departure?.iataCode] ||
                  outboundSegments[0]?.departure?.iataCode ||
                  "Desconocido"}{" "}
              </Text>
            </View>
            <Text style={{ fontSize: 17 }}>
              {formatDateTime(outboundSegments[0]?.departure?.at)}
            </Text>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text style={styles.details}>Destination:</Text>
              <Text style={{}}>
                {iataToCity[
                  outboundSegments[outboundSegments.length - 1]?.arrival
                    ?.iataCode
                ] ||
                  outboundSegments[outboundSegments.length - 1]?.arrival
                    ?.iataCode ||
                  "Desconocido"}{" "}
              </Text>
            </View>
            <Text style={{ fontSize: 17 }}>
              {formatDateTime(
                outboundSegments[outboundSegments.length - 1]?.arrival?.at
              )}
            </Text>
          </View>
        </View>

        <View style={styles.flightDetails}>
          {outboundSegments.length > 1 && (
            <View style={styles.stopovers}>
              <Text style={styles.stopoversTitle}>Escalas de Salida:</Text>
              {outboundSegments.slice(1).map((segment, index) => (
                <Text key={index} style={styles.stopover}>
                  Escala {index + 1}:{" "}
                  {iataToCity[segment.departure?.iataCode] ||
                    segment.departure?.iataCode ||
                    "Desconocido"}{" "}
                  a{" "}
                  {iataToCity[segment.arrival?.iataCode] ||
                    segment.arrival?.iataCode ||
                    "Desconocido"}{" "}
                  el {formatDateTime(segment.departure?.at)}
                </Text>
              ))}
            </View>
          )}

          {returnFlight && (
            <>
              <View style={styles.containerRow}>
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Airline:{" "}
                  {outbound?.validatingAirlineCodes[0] || "Desconocida"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text style={{ color: "#7BD5FFFF", fontSize: 13 }}>
                    Return flight
                  </Text>
                  <MaterialCommunityIcons
                    name="airplane-landing"
                    size={20}
                    color="#7BD5FFFF"
                  />
                </View>
              </View>
              <View style={styles.containerRowData}>
                <Text style={{ color: "#535353FF" }}>
                  Flight number:{" "}
                  {returnSegments[0]?.carrierCode + returnSegments[0]?.number ||
                    "N/A"}
                </Text>
                <Text style={styles.details}>
                  Duracion:{" "}
                  {formatDuration(returnFlight?.itineraries[0]?.duration) ||
                    "Desconocida"}
                </Text>
              </View>

              <View style={styles.containerRowData}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.details}>Origin:</Text>
                    <Text>
                      {iataToCity[returnSegments[0]?.departure?.iataCode] ||
                        returnSegments[0]?.departure?.iataCode ||
                        "Desconocido"}{" "}
                    </Text>
                  </View>

                  <Text style={{ fontSize: 17 }}>
                    {formatDateTime(returnSegments[0]?.departure?.at)}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.details}>Destination:</Text>
                    <Text>
                      {iataToCity[
                        returnSegments[returnSegments.length - 1]?.arrival
                          ?.iataCode
                      ] ||
                        returnSegments[returnSegments.length - 1]?.arrival
                          ?.iataCode ||
                        "Desconocido"}{" "}
                    </Text>
                  </View>

                  <Text style={{ fontSize: 17 }}>
                    {formatDateTime(
                      returnSegments[returnSegments.length - 1]?.arrival?.at
                    )}
                  </Text>
                </View>
              </View>

              {returnSegments.length > 1 && (
                <View style={styles.stopovers}>
                  <Text style={styles.stopoversTitle}>Escalas de Regreso:</Text>
                  {returnSegments.slice(1).map((segment, index) => (
                    <Text key={index} style={styles.stopover}>
                      Escala {index + 1}: de{" "}
                      {iataToCity[segment.departure?.iataCode] ||
                        segment.departure?.iataCode ||
                        "Desconocido"}{" "}
                      a{" "}
                      {iataToCity[segment.arrival?.iataCode] ||
                        segment.arrival?.iataCode ||
                        "Desconocido"}{" "}
                      el {formatDateTime(segment.departure?.at)}
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 30,
              paddingHorizontal: 20,
              marginTop: 15,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.details}>
              {outbound?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin ||
                "Desconocida"}
            </Text>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#16B5FFFF" }}
            >
              Total Price: {totalPrice} MXN
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          paddingLeft: 30,
          color: "#16B5FFFF",
          fontWeight: "bold",
          fontSize: 23,
          marginBottom: 10,
        }}
      >
        Flights available
      </Text>
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
    paddingTop: 15,
    backgroundColor: "#0D253BFF",
  },

  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#16B5FFFF",
    width: "100%",
    height: 35,
    paddingHorizontal: 20,
  },

  containerRowData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFFFF",
    width: "100%",
    height: 35,
    paddingHorizontal: 20,
  },

  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  flightItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flightDetails: {
    paddingVertical: 10,
  },
  airline: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#007BFF",
  },
  flightType: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FF5722",
    marginTop: 10,
  },
  flightNumber: {
    marginTop: 5,
    fontSize: 16,
    color: "#555",
  },
  details: {
    fontSize: 14,
    color: "#777",
  },
  stopovers: {
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: "#E9F5FFFF",
    padding: 10,
    marginVertical: 5,
  },
  stopoversTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#16B5FFFF",
  },
  stopover: {
    marginTop: 3,
    fontSize: 14,
    color: "#888",
  },
  price: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#FF5722",
  },
});

const convertToMXN = (amount) => {
  return (amount * 20).toFixed(2);
};

export default FlightResultsScreen;
