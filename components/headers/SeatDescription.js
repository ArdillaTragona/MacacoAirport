import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";

const SeatDescription = () => {
  const seatInfo = [
    [
      { label: "Seat available", color: "#9FD9FFFF", marginRight: 55 },
      { label: "Seat occupied ", color: "#202A66FF" },
    ],
    [
      { label: "Selected seat ", color: "#2EABFFFF", marginRight: 60 },
      { label: "Window seat   ", color: "#5A9AC5FF" },
    ],
  ];

  return (
    <View style={styles.container}>
      {seatInfo.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((info, index) => (
            <View style={styles.item} key={index}>
              <MaterialCommunityIcons
                name="seat"
                size={24}
                color={info.color}
              />
              <Text
                style={[styles.text, { marginRight: info.marginRight || 0 }]}
              >
                {info.label}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default SeatDescription;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  row: {
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#535353FF",
    marginLeft: 3,
  },
});
