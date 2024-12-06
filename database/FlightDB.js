import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { db } from "../credenciales";

/**
 * Limpia un objeto eliminando campos con valores `undefined`.
 * @param {Object} obj - El objeto a limpiar.
 * @returns {Object} - El objeto limpio.
 */
function cleanData(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );
}

/**
 * Guarda los datos del vuelo en Firestore.
 * @param {Object} flightData - Información del vuelo.
 */
async function saveFlight(flightData) {
  const cleanFlightData = cleanData(flightData);
  const flightDoc = doc(db, "flights", cleanFlightData.flightNumber);
  await setDoc(flightDoc, cleanFlightData);
}

/**
 * Guarda los datos de los pasajeros en Firestore.
 * @param {Array} passengers - Lista de pasajeros.
 * @param {String} flightId - ID del vuelo asociado.
 * @param {String} userId - ID del usuario que creó los datos.
 */
async function savePassengers(passengers, flightId, userId) {
  const passengersCollection = collection(db, "passengers");

  for (const passenger of passengers) {
    const cleanPassenger = cleanData({
      flightId: flightId,
      IDUser: userId,
      name: passenger.name,
      lastName: passenger.lastName,
      seat: passenger.selectedSeats,
      category: passenger.category,
    });
    await addDoc(passengersCollection, cleanPassenger);
  }
}

/**
 * Guarda los datos del vuelo y los pasajeros distribuidos en colecciones.
 * @param {Object} flightData - Información del vuelo.
 * @param {Array} passengers - Lista de pasajeros.
 * @param {String} userId - ID del usuario que creó los datos.
 */
export async function saveFlightDataToFirestore(flightData, passengers, userId) {
  try {
    // Guardar datos del vuelo
    await saveFlight({ ...flightData, IDUser: userId });

    // Guardar datos de los pasajeros
    await savePassengers(passengers, flightData.flightNumber, userId);

    console.log("Datos guardados correctamente en Firestore.");
    return true;
  } catch (error) {
    console.error("Error al guardar datos en Firestore:", error.message);
    return false;
  }
}
