import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { auth } from "../services/config";

export default function GetStarted() {
  const navigation = useNavigation();
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
          source={require("../../assets/images/welcome.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login')}}>
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
    width: "100%",
    height: 500,
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
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
  },
});
