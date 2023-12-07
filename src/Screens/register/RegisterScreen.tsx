import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputComp from "../../components/inputComp/InputComp";
import { ScrollView } from "react-native-gesture-handler";
import ComboBox from "../../components/comboBox/ComboBox";
import data from "../../utility/data.js";
import TextButton from "../../components/button/TextButton";
import { AdministrativeArea } from "../../utility/AdminstrativeArea";
import HeaderComponent from "../../components/header/HeaderComponent";

const RegisterScreen = () => {
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
      setDistricts(Object.keys(AdministrativeArea.getDistrictsByProvince(province)));
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
  useEffect(() => {
    updateDistricts();
    updateSectors();
    updateCells();
    updateVillages();
  }, [province, district, sector, cell, village]);

  return (
    <View style={styles.container}>
      <HeaderComponent title="New Visitor REgistration" />
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
          keyboard="numeric"
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
    // marginTop: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color:'white'
  },
  form: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
