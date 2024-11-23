import { auth, db } from "../credenciales"; // Importar Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Para guardar en Firestore

/**
 * Registra un nuevo usuario en Firebase Authentication y guarda su información en Firestore.
 * @param {string} username - Nombre de usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<void>} Una promesa que indica el éxito o el error.
 */
export async function registerUser(username, email, password) {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    // Crear el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar los datos del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      password: password, // Guardar la contraseña sin encriptar
      createdAt: new Date(),
    });

    console.log("User registered successfully");
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error; // Lanzar el error para manejarlo en la pantalla
  }
}
