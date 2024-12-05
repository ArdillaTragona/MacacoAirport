// LoginDB.js
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

export const validateCredentials = async (email, password) => {
  console.log("Attempting to validate credentials for email:", email);

  try {
    const snapshot = await usersCollection.where('email', '==', email).get();
    console.log(`Found ${snapshot.size} users with this email.`); // Ver cuántos usuarios coinciden

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0]; // Obtener el primer documento que coincide
      const userData = userDoc.data();
      console.log("User data retrieved:", userData);

      // Comparar la contraseña con la almacenada
      if (userData.password === password) {
        console.log("Password match!");
        return { success: true, user: userData };
      } else {
        console.log("Incorrect password.");
        return { success: false, message: 'Incorrect password' };
      }
    } else {
      console.log("No user found with this email.");
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error("Error validating credentials: ", error);
    return { success: false, message: 'Error occurred during validation' };
  }
};
