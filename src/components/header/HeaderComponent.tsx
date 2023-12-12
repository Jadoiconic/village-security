import { StyleSheet, Text, View } from "react-native";
import React from "react";
interface headerProps {
  title: string;
  headerLeft?: (any: any) => void;
  headerRight?: (any: any) => void;
  border?: number;
}

const HeaderComponent = ({ headerLeft, title, headerRight, border }: headerProps) => {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: headerLeft || headerRight ? "row" : "column", borderBottomWidth: border ? 1 : border, },
      ]}
    >
      {headerLeft && (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      {headerRight && (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  container: {
    borderColor: "black",
    paddingVertical: 20,
    backgroundColor: "#6C63FF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
