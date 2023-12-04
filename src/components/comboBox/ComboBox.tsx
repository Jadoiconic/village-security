import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ComboBoxProps {
  onSelectChange: (value: string) => void;
  selectedValue: string;
  label: string;
  options: string[];
}

const ComboBox = ({
  label,
  selectedValue,
  onSelectChange,
  options,
}: ComboBoxProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
      style={styles.select}
      >
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onSelectChange(itemValue as string)}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    borderColor: "gray",
    marginBottom: 10,
  },
  select:{
    borderWidth:1,
    borderRadius: 5,
    borderColor: "gray",
  },
});

export default ComboBox;
