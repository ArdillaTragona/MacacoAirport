import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function NavMain(){
  return (
    <View style={styles.container}>
      <Text>NavMain</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center"
  },
});
