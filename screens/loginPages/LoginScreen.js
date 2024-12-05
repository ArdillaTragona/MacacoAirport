import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from "react-native";

// Importar la configuración de Firebase y funciones necesarias
import { auth, db } from "../../credenciales"; // Asegúrate de la ruta correcta
import { signInWithEmailAndPassword } from "firebase/auth"; // Importar la función de login de Firebase
import { doc, getDoc } from "firebase/firestore"; // Si deseas trabajar con Firestore también

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [focusedInput, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar los errores

  const handleLogin = async () => {
    try {
      // Intentamos autenticar al usuario con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Si el login es exitoso, puedes hacer algo adicional
      console.log("Usuario autenticado:", userCredential.user);

      // Si deseas validar más información, como obtener datos adicionales de Firestore:
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        console.log("Datos del usuario:", userDocSnap.data());
      } else {
        console.log("El documento del usuario no existe");
      }

      // Establecer la autenticación a true si el login es exitoso
      setIsAuthenticated(true); 

    } catch (error) {
      console.error("Error de autenticación:", error);
      setError("Correo o contraseña incorrectos"); // Mostrar un mensaje de error
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={require("../../assets/images/WallpaperBlue.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.contenido}>
          <Image
            source={require("../../assets/icons/LogoBird.png")}
            resizeMode="contain"
            style={styles.logoImage}
          />

          <Text style={styles.textoEncabezado}>Username / Email</Text>
          <TextInput
            style={[styles.input, focusedInput === "email" && styles.focusedInput]}
            maxLength={35}
            selectionColor="#158AD8FF"
            placeholder="example01@email.com"
            placeholderTextColor="#BBBBBB"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsFocused("email")}
            onBlur={() => setIsFocused(null)}
          />

          <Text style={styles.textoEncabezado}>Password</Text>
          <TextInput
            style={[styles.input, focusedInput === "password" && styles.focusedInput]}
            secureTextEntry
            placeholder="password_example"
            placeholderTextColor="#BBBBBB"
            value={password}
            onChangeText={setPassword}
            selectionColor="#158AD8FF"
            onFocus={() => setIsFocused("password")}
            onBlur={() => setIsFocused(null)}
          />

          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

          <TouchableOpacity style={styles.botonLogReg} onPress={handleLogin}>
            <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 15 }}>
              Sign in
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#ffffff" }}>Create an account</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "#FFFFFF", fontWeight: "bold", marginLeft: 10 }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    //Pricipal
    flex: 1,
  },
  backgroundImage: {
    //Principal / BackgroundImage
    flex: 1,
  },
  contenido: {
    //Principal/BackgroundImage/Contenido
    flex: 1,
    margin: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 8,
    marginBottom: 10,
    borderRadius: 30,
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",

    //borderColor: "#FFFFFF",
    //borderWidth: 4,
  },
  focusedInput: {
    elevation: 20,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 35,
    color: "#2EABFFFF",
    shadowColor: "#05043FFF",
    shadowOffset: { width: 0, height: 1 },

    borderColor: "#22B6FAFF",
    borderWidth: 3,
  },
  logoImage: {
    width: "20%",
    height: "20%",
  },
  textoEncabezado: {
    color: "#ffffff",
    marginBottom: 5,
  },
  botonLogReg: {
    width: "100%",
    padding: 10,
    backgroundColor: "#158AD8FF",
    borderRadius: 30,
    marginBottom: 5,
    marginTop: 15,
  },
});
