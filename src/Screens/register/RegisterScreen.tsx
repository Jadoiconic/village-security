import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputComp from "../../components/inputComp/InputComp";
import { ScrollView } from "react-native-gesture-handler";
import ComboBox from "../../components/comboBox/ComboBox";
import data from "../../utility/data.js";
import TextButton from "../../components/button/TextButton";
import { AdministrativeArea } from "../../utility/AdminstrativeArea";

const RegisterScreen = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [province, setProvice] = useState("North");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [id, setId] = useState("");
  const [phone, sePhone] = useState("");
  const [email, setEmail] = useState("");

  const [prov] = useState(AdministrativeArea.getProvinces(data));
  const [dist,setDist] = useState(Object.keys(AdministrativeArea.getDistrictsByProvince(province)));
  const [sect,setSect] = useState(Object.keys(AdministrativeArea.getSectorsByDistrict('Gakenke','North')));

useEffect(()=>{
  if(province){
    setDist(Object.keys(AdministrativeArea.getDistrictsByProvince(province)))
  }else if(district){
    // setSector(Object.keys(AdministrativeArea.getSectorsByDistrict(district,province)))
  }
},[province])
  console.log(sect)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>New Vistor Registration</Text>
      </View>
      <ScrollView style={styles.form}>
        <ComboBox
          label="Province"
          selectedValue={province}
          onSelectChange={(value) => setProvice(value)}
          options={prov}
        />
        <ComboBox
          label="Districts"
          selectedValue={district}
          onSelectChange={(value) => setDistrict(value)}
          options={dist}
        />
        <ComboBox
          label="Sector"
          selectedValue={sector}
          onSelectChange={(value) => setSector(value)}
          options={sect}
        />
        <ComboBox
          label="Cell"
          selectedValue={province}
          onSelectChange={(value) => setProvice(value)}
          options={["North", "South", "West", "East", "Kigali City"]}
        />
        <ComboBox
          label="Village"
          selectedValue={province}
          onSelectChange={(value) => setProvice(value)}
          options={["North", "South", "West", "East", "Kigali City"]}
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
          value={id}
          onChangeText={(e) => setId(e)}
        />
        <InputComp
          label="Phone"
          placeholder="078xxxxxxx"
          value={phone}
          keyboard = "numeric"
          onChangeText={(e) => sePhone(e)}
          contentType="telephoneNumber"
        />
        <InputComp
          label="Phone *"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={(e) => setEmail(e)}
          contentType="emailAddress"
        />
        <TextButton title={"Register"} />
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    paddingHorizontal: 20,
    marginBottom:20
  },
});
