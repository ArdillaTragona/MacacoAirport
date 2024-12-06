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
 */
async function savePassengers(passengers, flightId) {
  const passengersCollection = collection(db, "passengers");

  for (const passenger of passengers) {
    const cleanPassenger = cleanData({
      flightId: flightId,
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
 */
export async function saveFlightDataToFirestore(flightData, passengers) {
  try {
    // Guardar datos del vuelo
    await saveFlight(flightData);

    // Guardar datos de los pasajeros
    await savePassengers(passengers, flightData.flightNumber);

    console.log("Datos guardados correctamente en Firestore.");
    return true;
  } catch (error) {
    console.error("Error al guardar datos en Firestore:", error.message);
    return false;
  }
}
