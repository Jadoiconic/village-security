import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import { auth } from "../../services/config";

const HomeScreen = () => {
  const Message = () => {
    return (
      <>
        <View>
          <Text>Test</Text>
        </View>
      </>
    );
  };
  return (
    <View>
      <HeaderComponent title="Home Page" />
      <Text>HomeScreen</Text>
      <Text>{auth.currentUser?.email}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
