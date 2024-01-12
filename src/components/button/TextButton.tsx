import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface buttonProps{
    title:string;
    onClick: (any:any) => void;
}
const TextButton = ({title, onClick }:buttonProps) => {
  return (
    <TouchableOpacity
        style={styles.button}
        onPress={onClick}
      >
        <View>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default TextButton

const styles = StyleSheet.create({
    button: {
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 8,
        backgroundColor: "#6C63FF",
        marginTop: 20,
      },
      buttonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        textAlign:'center'
      },
})