import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { login } from "../../services/Auth";
import { auth } from "../../services/config";
import { signInWithEmailAndPassword } from "firebase/auth";

interface NavigationProps{
  navigation: NavigationProp<any,any>
}
const SiginInScreen = ({navigation}:NavigationProps) => {
  useEffect(()=>{
   const unsbscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsbscribe
  },[])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      if (user) {
        navigation.navigate("Home");
      }
    } catch (error) {
      alert("Invalid Email or Password!")
      // throw error;
    }finally{
      setLoading(false)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Village</Text>

      <View style={{ width: "100%", height: "50%", padding: 40 }}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@gmail.com"
              autoCapitalize="none"
              value={email}
              onChangeText={(e) => {
                setEmail(e);
                setLoading(false);
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(e) => setPassword(e)}
              style={styles.input}
              secureTextEntry
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button,{backgroundColor: !email || !password.length  ||loading ? "#9C99ff" : "#6C63FF",}]}
          disabled={(!email || !password) && loading ? true : false}
          onPress={handleLogin}
        >
          <View>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            //   navigation.navigate("Home");
          }}
        >
          <View>
            <Text
              style={[styles.buttonText, { color: "blue", textAlign: "right" }]}
            >
              forgot a Password?
            </Text>
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
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 20,
    fontSize: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    paddingBottom: 10,
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
    textAlign: "center",
  },
});

export default SiginInScreen;
