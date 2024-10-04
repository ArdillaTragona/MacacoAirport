import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Destination = ({ navigation }) => {
  return (
    <View>
      <Text>Destination</Text>
      <Button
        title={"Search flights"}
        onPress={navigation.navigate("Flights")}
      ></Button>
    </View>
  );
};

export default Destination;

const styles = StyleSheet.create({});
