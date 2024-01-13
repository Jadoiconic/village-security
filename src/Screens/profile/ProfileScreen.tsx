import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../services/config";
import HeaderComponent from "../../components/header/HeaderComponent";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";

interface NavigationProps {
  navigation: NavigationProp<any, any>;
}

const ProfileScreen = ({ navigation }: NavigationProps) => {
  const [userData, setUserData] = useState([]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logged out successfully");
      setUserData([]);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const userId = auth.currentUser?.uid;
  React.useEffect(() => {
    fetchData();
  }, [onAuthStateChanged]);

  const fetchData = async () => {
    try {
      const q = query(collection(db, "Users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(data);
    } catch (error) {
      console.error(
        "Error fetching data: ",
        error.code,
        error.message,
        error.stack
      );
    }
  };

  return (
    <ScrollView>
      <HeaderComponent title={"Profile Information"} border={0} />
      <View style={styles.propfileInfo}>
        <View style={styles.profilePicture}>
          <Entypo name="user" size={100} color="white" />
        </View>
        <View>
          <Text style={[styles.caption, { fontWeight: "bold" }]}>
            {userData[0]?.firstName} {userData[0]?.lastName}{" "}
          </Text>
          <Text style={styles.caption}>Email: {auth.currentUser?.email}</Text>
          <Text style={[styles.caption, { fontSize: 15, color: "#ddd" }]}>
            Chief of {userData[0]?.role}{" "}
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        {userData.map((user, idx) => (
          <View key={idx} style={styles.userInfo}>
            <Text style={styles.labels}>First Name: {user.firstName}</Text>
            <Text style={styles.labels}>Last Name: {user.lastName}</Text>
            <Text style={styles.labels}>Phone Number: {user.phone}</Text>
            <Text style={styles.labels}>level: {user.role}</Text>
            <Text style={styles.labels}>Address</Text>
            <Text style={styles.labels}>District: {user.district}</Text>
            <Text style={styles.labels}>Sector: {user.sector}</Text>
            <Text style={styles.labels}>Cell: {user.cell}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          padding: 20,
          backgroundColor: "#6C63FF",
          width: "50%",
          alignSelf: "center",
          marginTop: 20,
          borderRadius: 8,
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              textAlign:'center'
            }}
          >
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#6C63FF",
  },
  labels: {
    fontSize: 25,
    paddingTop: 15,
  },
  propfileInfo: {
    backgroundColor: "#6C63FF",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    padding: 10,
  },
  caption: {
    color: "white",
    fontSize: 20,
  },
});
