import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/config";
import HeaderComponent from "../../components/header/HeaderComponent";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const ListOfVisitors = () => {
  const [visitorData, setVisitorData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Visitors"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVisitorData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [visitorData, search]);

  const filteredData = visitorData.filter(
    (visitor) =>
      visitor.identity.toLowerCase().includes(search.toLowerCase()) ||
      visitor.cell.toLowerCase().includes(search.toLowerCase()) ||
      visitor.village.toLowerCase().includes(search.toLowerCase()) ||
      visitor.sector.toLowerCase().includes(search.toLowerCase()) ||
      visitor.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <HeaderComponent title={"List of Visitors"} />
      <View style={styles.searchContainer}>
        <View
          style={{
            backgroundColor: "#eee",
            width: "100%",
            flexDirection: "row",
            borderRadius: 5,
          }}
        >
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={(e) => setSearch(e)}
            style={styles.searchBox}
          />
          <View style={styles.searchButton}>
            <FontAwesome name="search" size={27} color="gray" />
          </View>
        </View>
      </View>
      <ScrollView horizontal>
        <View>
          <View style={[styles.row, { borderTopWidth: 1 }]}>
            <Text style={{ width: 30, fontWeight: "bold" }}>No</Text>
            <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Names</Text>
            <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Id</Text>
            <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Phone</Text>
            <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Cell</Text>
            <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>
              Village
            </Text>
            <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>
              Date
            </Text>
          </View>
          {filteredData.map((visitor, index) => (
            <View key={index} style={styles.row}>
              <Text style={[{ width: 30 }]}>{index + 1}</Text>
              <Text style={styles.rowTitle}>
                {visitor.firstName} {visitor.lastName}
              </Text>
              <Text style={styles.rowTitle}>{visitor.identity}</Text>
              <Text style={styles.rowTitle}>{visitor.phone}</Text>
              <Text style={styles.rowTitle}>{visitor.cell}</Text>
              <Text style={styles.rowTitle}>{visitor.village}</Text>
              <Text style={styles.rowTitle}>{visitor?.createdAt}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListOfVisitors;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    width: "100%",
  },
  rowTitle: {
    width: 120,
    borderRightWidth: 1,
    height: 40,
  },
  searchContainer: {
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  searchBox: {
    backgroundColor: "#eee",
    width: "90%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchButton: {
    padding: 10,
    alignContent: "center",
  },
});
