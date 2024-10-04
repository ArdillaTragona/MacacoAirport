import { StyleSheet, Text, View,Button } from "react-native";
import React from "react";

const Passenger = ({ navigation }) => {
  return (
    <View>
      <Text>Passenger</Text>
      <Button
        title={"Seats selector"}
        onPress={navigation.navigate("Seats")}
      ></Button>
    </View>
  );
};

export default Passenger;

const styles = StyleSheet.create({});
