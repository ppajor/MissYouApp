import React from "react";
import { TextInput, StyleSheet } from "react-native";
import globals from "./style";

function DefInput(props) {
  const { value, placeholder } = props;
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={globals.secondaryColor}
      onChangeText={(e) => props.onChange(e)}
    />
  );
}

export default DefInput;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    color: globals.secondaryColor,
    fontSize: 16,
    padding: 16,
    marginTop: "15%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: globals.secondaryColor,
  },
});
