import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import { auth, db } from "../../services/config";
import { addDoc, collection } from "firebase/firestore";

const UsersScreen = () => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(auth.currentUser.uid);
  }, []);

  const handleReagisterVisotor = async () => {
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        firstName: "MAHIRWE",
        lastName: "Augstine",
        privince: "South",
        district: "Huye",
        sector: "Byaza",
        cell: "Nyanza",
        village: "Nyanza",
        identity: 1223456765433,
        phone: "07883000",
        email: "augstine@gmail.com",
        userId: userId,
        role: "sector",
      });
      if (docRef) alert("Data Recorded successfuly!");
    } catch (e) {
      alert(e);
    }
  };

  
  return (
    <View>
      <HeaderComponent title="Users" />
      <Text>UsersScreen</Text>
      <TouchableOpacity onPress={handleReagisterVisotor}>
        <View>
          <Text>Register user</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({});
