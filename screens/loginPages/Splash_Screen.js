import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // Navegar a la pantalla principal después de 3 segundos
      navigation.replace("Login");
    }, 5000); // Puedes ajustar la duración
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />

      <ImageBackground
        source={require("../../assets/images/WallpaperBlue.png")} // Ruta de la imagen de fondo
        style={styles.backgroundImage} // Estilo para el ImageBackground
        resizeMode="cover" /* tomar toda la pantalla */
      >
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={require("../../assets/icons/LogoBird.png")}
            resizeMode="contain"
          ></Image>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1, // Asegura que el ImageBackground ocupe todo el espacio del contenedor
    width: "100%", // Ajusta el ancho al 100% del contenedor
    height: "100%", // Ajusta la altura al 100% del contenedor
  },

  content: {
    flex: 1,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },

  logo: {
    width: 60,
    height: 60,
  },
});

export default SplashScreen;
