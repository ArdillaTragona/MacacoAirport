import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { firebaseApp } from "../credenciales";

const db = getFirestore(firebaseApp);

/**
 * Obtiene los tickets correspondientes al usuario autenticado.
 * @param {string} userId - ID del usuario autenticado.
 * @returns {Promise<Array>} Lista de tickets organizados por fecha.
 */
export const getTicketsForUser = async (userId) => {
  try {
    // Consultar los vuelos relacionados al usuario actual
    const flightsQuery = query(
      collection(db, "flights"),
      where("IDUser", "==", userId) // Filtra vuelos por el ID del usuario autenticado
    );
    const flightsSnapshot = await getDocs(flightsQuery);

    // Consultar todos los pasajeros
    const passengersSnapshot = await getDocs(collection(db, "passengers"));

    const flights = flightsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const passengers = passengersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Vincular pasajeros con vuelos
    const groupedTickets = flights.reduce((acc, flight) => {
      const relevantPassengers = passengers.filter(
        (p) => p.flightId === flight.flightNumber && p.IDUser === userId
      );

      const date = flight.departureDate;

      if (!acc[date]) acc[date] = [];
      relevantPassengers.forEach((passenger) => {
        acc[date].push({
          id: passenger.id,
          origin: flight.origin,
          destination: flight.destination,
          firstName: passenger.name,
          lastName: passenger.lastName,
        });
      });

      return acc;
    }, {});

    // Formatear los datos para el SectionList
    return Object.entries(groupedTickets).map(([date, tickets]) => ({
      date,
      tickets,
    }));
  } catch (error) {
    console.error("Error fetching tickets: ", error);
    return [];
  }
};
