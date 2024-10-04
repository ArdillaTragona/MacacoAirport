import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Passenger = () => {
  return (
    <View>
      <Text>Passenger</Text>
      <Button onPress={navigator.navigate("Seats")}></Button>
    </View>
  )
}

export default Passenger

const styles = StyleSheet.create({})