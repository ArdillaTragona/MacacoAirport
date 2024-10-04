import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FlightList = () => {
  return (
    <View>
      <Text>FlightList</Text>
      <Button onPress={navigator.navigate("Passengers")}></Button>
    </View>
  )
}

export default FlightList

const styles = StyleSheet.create({})