import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../../services/config";
import HeaderComponent from "../../components/header/HeaderComponent";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import LogoutButton from "../../components/logout/LogoutButton";

const ProfileScreen = () => {
  const [fname,setFname] = useState('NIYOMUGABO')
  const [lname,setLname] = useState('Erineste')
  const [position,setPosition] = useState('Chief')
  return (
    <ScrollView>
      <HeaderComponent title={"Profile Information"} border={0} />
      <View style={styles.propfileInfo}>
        <View style={styles.profilePicture}>
          <Entypo name="user" size={100} color="white" />
        </View>
        <View>
          <Text style={[styles.caption,{fontWeight:'bold'}]}>{lname} {fname} </Text>
          <Text style={styles.caption}>Email: {auth.currentUser?.email}</Text>
          <Text style={[styles.caption,{fontSize:15, color:'#ddd'}]}>{position} </Text>
        </View>
      </View>

      <Text>ProfileScreen</Text>
      <Text>{auth.currentUser?.uid}</Text>
      <LogoutButton />

    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  propfileInfo: {
    backgroundColor: "#6C63FF",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    padding: 10,
  },
  caption:{
    color:'white',
    fontSize:20
  }
});
