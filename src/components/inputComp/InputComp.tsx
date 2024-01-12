import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

interface InputProps {
  props?: string;
  onChangeText: (any: any) => void;
  value: string;
  placeholder: string;
  label: string;
  contentType?: string;
  keyboard?: string;
}

const InputComp = ({
  label,
  placeholder,
  value,
  onChangeText,
  contentType,
  keyboard,
  ...props
}: InputProps) => {
  return (
    <View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          value={value}
          keyboardType={keyboard}
          autoCapitalize="none"
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    borderColor: "gray",
    fontSize: 20,
  },
});
