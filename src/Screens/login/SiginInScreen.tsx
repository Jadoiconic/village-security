import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

const SiginInScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Village</Text>

      <View style={{ width: "100%", height: "50%", padding:40 }}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput placeholder="example@gmail.com" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput placeholder="Password" style={styles.input} secureTextEntry/>
          </View>
        </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop:10}}
        onPress={() => {
        //   navigation.navigate("Home");
        }}
      >
        <View>
          <Text style={[styles.buttonText,{color:'blue', textAlign:'right'}]}>forgot a Password?</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth:1,
    borderColor:'gray',
    borderRadius:5,
    paddingHorizontal:20,
    fontSize:20
  },
  label: {
    fontSize:20,
    fontWeight:'bold'
  },
  inputContainer: {
    paddingBottom:10
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
    textAlign:'center'
  },
});

export default SiginInScreen;
