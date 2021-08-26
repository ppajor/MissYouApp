import React from "react";
import { View, Text, StyleSheet } from "react-native";
import global from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";

function DefBtn(props) {
  const { value = "przykladowy button", disabled = false } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.btn, disabled && styles.disabled]}
    >
      <Text
        style={{
          color: global.secondaryColor,
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
}

export default DefBtn;

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    backgroundColor: "#202020",

    marginLeft: "auto",
    marginRight: "auto",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  disabled: {
    borderWidth: 1,
    borderColor: "#202020",
    backgroundColor: global.primaryColor,
  },
});
