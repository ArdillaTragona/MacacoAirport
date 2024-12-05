// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore"; // Si lo necesitas
// todo Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8kXfd1So7TDMp_B7SKoxHgDQ27HsPdus",
  authDomain: "aero-d43a3.firebaseapp.com",
  projectId: "aero-d43a3",
  storageBucket: "aero-d43a3.firebasestorage.app",
  messagingSenderId: "819038995238",
  appId: "1:819038995238:web:6d174dfa8ab4376cdd37e7",
  measurementId: "G-ZMVW7ZML3W"
};

const app = initializeApp(firebaseConfig); // Inicializa Firebase

// Inicializa Firebase Auth con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app); // Si lo necesitas

export { auth, db };