import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Destination = () => {
  return (
    <View>
      <Text>Destination</Text>
      <Button onPress={navigator.navigate("Flights")}></Button>
    </View>
  )
}

export default Destination

const styles = StyleSheet.create({})