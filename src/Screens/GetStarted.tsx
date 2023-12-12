import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { auth } from "../services/config";

interface NavigationProps{
  navigation: NavigationProp<any,any>
}

export default function GetStarted({navigation}:NavigationProps) {
  useEffect(()=>{
  if(auth.currentUser?.email){
    navigation.navigate("Home")
  }else{
    navigation.navigate("Welcome")
  }

  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Village</Text>
      
      <View style={{ width: "100%", height: "50%", position: "relative" }}>
        <Image
          source={require("../../assets/images/wlcm.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity style={[styles.button,{backgroundColor: "#6C63FF",}]} onPress={()=>{navigation.navigate('Login')}}>
        <View>
          <Text style={styles.buttonText}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height:'100%'
  },
  image: {
    width: "95%",
    height: 500,
    resizeMode: "cover",
    borderRadius:250,
    alignSelf:'center'
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});
