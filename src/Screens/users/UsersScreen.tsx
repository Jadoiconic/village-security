import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import InputComp from "../../components/inputComp/InputComp";
import { ScrollView } from "react-native-gesture-handler";
import ComboBox from "../../components/comboBox/ComboBox";
import data from "../../utility/data.js";
import TextButton from "../../components/button/TextButton";
import { AdministrativeArea } from "../../utility/AdminstrativeArea";
import HeaderComponent from "../../components/header/HeaderComponent";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../services/config";
import { NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { signup } from "../../services/Auth";

interface NavigationProps {
  navigation: NavigationProp<any, any>;
}
const UsersScreen = ({ navigation }: NavigationProps) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [province, setProvice] = useState("North");
  const [district, setDistrict] = useState("Gakenke");
  const [sector, setSectorsor] = useState("Busengo");
  const [cell, setCell] = useState("Ruhanga");
  const [village, setVillage] = useState("Bukinga");
  const [id, setId] = useState("");
  const [phone, sePhone] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [level, setLevel] = useState("");
  const [password] = useState("123456");

  const [isRegister, setIsRegister] = useState(false);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // handle submit

  useEffect(() => {
    setUserId(auth.currentUser.uid);
    fetchData();
    updateDistricts();
    updateSectors();
    updateCells();
    updateVillages();
  }, [province, district, sector, cell, village, isRegister, search]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const hadleReagisterUser = async () => {
    try {
      if (!email || !fname || !lname || !phone || !id) return alert("Some fields are Empty, Please fill form and submit again!");
      const credentails = await signup({ email, password });
      if (credentails) {
        var datetime = new Date().toLocaleDateString();
        const docRef = await addDoc(collection(db, "Users"), {
          firstName: fname,
          lastName: lname,
          privince: province,
          district: district,
          sector: sector,
          cell: cell,
          village: village,
          role: level,
          identity: id,
          phone: phone,
          email: email,
          createdAt: datetime,
          userId: credentails.user.uid,
          registedBy: userId,
        });
        if (docRef) {
          alert("Data Recorded successfuly!");
          navigation.navigate("Users");
        } else {
        }
      }else{
        Alert.alert("Please provide valid email!")
      }
    } catch (e) {
      Alert.alert("Something went wrong try again! with right Email");
    }
  };

  // habdle hold values

  const [provinces] = useState(AdministrativeArea.getProvinces(data));
  const [districts, setDistricts] = useState(
    Object.keys(AdministrativeArea.getDistrictsByProvince(province))
  );
  const [sectors, setSectors] = useState(
    Object.keys(
      AdministrativeArea.getSectorsByDistrict({
        district: "Gakenke",
        province: "North",
      })
    )
  );
  const [cells, setCells] = useState(
    Object.keys(
      AdministrativeArea.getCellsBySector({ province, district, sector })
    )
  );

  const [villages, setVillages] = useState(
    AdministrativeArea.getVillagesByCell({ province, district, sector, cell })
  );

  const updateDistricts = () => {
    if (province) {
      setDistricts(
        Object.keys(AdministrativeArea.getDistrictsByProvince(province))
      );
    }
  };

  const updateSectors = () => {
    if (district && province) {
      const sectors = AdministrativeArea.getSectorsByDistrict({
        district,
        province,
      });

      if (sectors) {
        setSectors(Object.keys(sectors));
      }
    }
  };

  const updateCells = () => {
    if (province && district && sector) {
      const cells = AdministrativeArea.getCellsBySector({
        province,
        district,
        sector,
      });

      if (cells) {
        setCells(Object.keys(cells));
      }
    }
  };

  const updateVillages = () => {
    if (province && district && sector && cell) {
      const villages = AdministrativeArea.getVillagesByCell({
        province,
        district,
        sector,
        cell,
      });

      if (cells) {
        setVillages(villages);
      }
    }
  };

  // const filteredData = users.filter(
  //   (user) =>
  //     user.identity.toLowerCase().includes(search.toLowerCase()) ||
  //     user.cell.toLowerCase().includes(search.toLowerCase()) ||
  //     user.village.toLowerCase().includes(search.toLowerCase()) ||
  //     user.sector.toLowerCase().includes(search.toLowerCase()) ||
  //     user.district.toLowerCase().includes(search.toLowerCase())
  // );

  if (isRegister) {
    return (
      <View style={styles.container}>
        <HeaderComponent title="New User Registration" />
        <ScrollView style={styles.form}>
          <ComboBox
            label="Province"
            selectedValue={province}
            onSelectChange={(value) => setProvice(value)}
            options={provinces}
          />

          {Boolean(districts) && (
            <ComboBox
              label="Districts"
              selectedValue={district}
              onSelectChange={(value) => setDistrict(value)}
              options={districts}
            />
          )}

          {Boolean(sectors) && (
            <ComboBox
              label="Sector"
              selectedValue={sector}
              onSelectChange={(value) => setSectorsor(value)}
              options={sectors}
            />
          )}

          {Boolean(cells) && (
            <ComboBox
              label="Cell"
              selectedValue={cell}
              onSelectChange={(value) => setCell(value)}
              options={cells}
            />
          )}

          {Boolean(villages) && (
            <ComboBox
              label="Village"
              selectedValue={village}
              onSelectChange={(value) => setVillage(value)}
              options={villages}
            />
          )}
          <ComboBox
            label="Administrative Level"
            selectedValue={level}
            onSelectChange={(value) => setLevel(value)}
            options={["Village", "Cell", "Sector", "Distict"]}
          />

          <InputComp
            label="First Name"
            placeholder="GAKWAYA"
            value={fname}
            onChangeText={(e) => setFName(e)}
          />
          <InputComp
            label="Last Name"
            placeholder="Gilbert"
            value={lname}
            onChangeText={(e) => setLName(e)}
          />
          <InputComp
            label="Identity"
            placeholder="1234567890123456"
            keyboard="numeric"
            value={id}
            onChangeText={(e) =>  {
              if (!isNaN(e)) setId(e);
            }}
          />
          <InputComp
            label="Phone"
            placeholder="078xxxxxxx"
            value={phone}
            keyboard="numeric"
            onChangeText={(e) => {
              if (!isNaN(e)) sePhone(e);
            }}
            contentType="telephoneNumber"
          />
          <InputComp
            label="Email *"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={(e) => setEmail(e)}
            contentType="emailAddress"
          />
          <TextButton title={"Register User"} onClick={hadleReagisterUser} />
          <TouchableOpacity
            style={{ width: "100%", alignContent: "center", padding: 20 }}
            onPress={() => setIsRegister(false)}
          >
            <View>
              <Text>View All Users</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <HeaderComponent title="Users" />
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
        <View style={{ width: "100%", marginBottom: 15 }}>
          <TextButton
            title={"Add New Users"}
            onClick={() => setIsRegister(true)}
          />
        </View>

        <View style={[styles.row, { borderTopWidth: 1 }]}>
          <Text style={{ width: 30, fontWeight: "bold" }}>No</Text>
          <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Names</Text>
          <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>email</Text>
          <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Phone</Text>
          <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Cell</Text>
          <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Village</Text>
          <Text style={[styles.rowTitle, { fontWeight: "bold" }]}>Level</Text>
        </View>
        {users.map((visitor, index) => (
          <View key={visitor.id} style={styles.row}>
            <Text style={[{ width: 30 }]}>{index + 1}</Text>
            <Text style={styles.rowTitle}>
              {visitor.firstName} {visitor.lastName}
            </Text>
            <Text style={styles.rowTitle}>{visitor.identity}</Text>
            <Text style={styles.rowTitle}>{visitor.phone}</Text>
            <Text style={styles.rowTitle}>{visitor.cell}</Text>
            <Text style={styles.rowTitle}>{visitor.village}</Text>
            <Text style={styles.rowTitle}>{visitor.village}</Text>
          </View>
        ))}
      </View>
    );
  }
};

export default UsersScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  rowTitle: {
    width: 100,
    borderRightWidth: 1,
    height: 40,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  form: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
