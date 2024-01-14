import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import homeImage from "../../../assets/images/meeting.jpeg";
import education from "../../../assets/images/education.jpeg";

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
      <ScrollView style={styles.container}>
        <Image source={homeImage} style={styles.image} />
        <Text style={styles.caption}>
          <Text style={styles.title}>Establish a community watch program</Text> where residents actively look out
          for each other and report any suspicious activities
        </Text>
        
        <Image source={education} style={styles.image} />
        <Text style={styles.caption}>
        <Text style={styles.title}>Educate residents on emergency protocols</Text> and establish communication
          channels for swift response during unforeseen situations.
        </Text>
        
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom:80
  },
  image: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    resizeMode: "cover",
    marginVertical:5
  },
  caption: {
    fontWeight: "500",
    fontSize: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
});
