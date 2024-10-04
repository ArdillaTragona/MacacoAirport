import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const FlightList = ({navigation}) => {
  return (
    <View>
      <Text>FlightList</Text>
      <Button title={"Passenger selector"} onPress={navigation.navigate("Passengers")}></Button>
    </View>
  )
}

export default FlightList

const styles = StyleSheet.create({})