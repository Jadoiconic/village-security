import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/header/HeaderComponent'

const UsersScreen = () => {
  return (
    <View>
        <HeaderComponent title='Users' />
      <Text>UsersScreen</Text>
    </View>
  )
}

export default UsersScreen

const styles = StyleSheet.create({})