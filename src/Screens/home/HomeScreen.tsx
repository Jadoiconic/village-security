import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/header/HeaderComponent'

const HomeScreen = () => {
  return (
    <View>
      <HeaderComponent title="Home Page" />
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})