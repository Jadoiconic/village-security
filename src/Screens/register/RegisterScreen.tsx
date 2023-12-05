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
  const [district, setDistrict] = useState("Gakenke");
  const [sector, setSector] = useState("Busengo");
  const [cell, setCell] = useState("Ruhanga");
  const [village, setVillage] = useState("Bukinga");
  const [id, setId] = useState("");
  const [phone, sePhone] = useState("");
  const [email, setEmail] = useState("");

  const [prov] = useState(AdministrativeArea.getProvinces(data));
  const [dist, setDist] = useState(
    Object.keys(AdministrativeArea.getDistrictsByProvince(province))
  );
  const [sect, setSect] = useState(
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
      setDist(Object.keys(AdministrativeArea.getDistrictsByProvince(province)));
    }
  };

  const updateSectors = () => {
    if (district && province) {
      const sectors = AdministrativeArea.getSectorsByDistrict({
        district,
        province,
      });

      if (sectors) {
        setSect(Object.keys(sectors));
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
      // console.log({cells})

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
      // console.log({ villages });

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

        {Boolean(district) && (
          <ComboBox
            label="Districts"
            selectedValue={district}
            onSelectChange={(value) => setDistrict(value)}
            options={dist}
          />
        )}

        {Boolean(sect) && (
          <ComboBox
            label="Sector"
            selectedValue={sector}
            onSelectChange={(value) => setSector(value)}
            options={sect}
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
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
