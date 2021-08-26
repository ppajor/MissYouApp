import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import global from "./style";

function Option(props) {
  const { name, partnerUsername, handlePartnerUsername } = props;

  let [fontsLoaded] = useFonts({
    "GreatVibes-Regular": require("./assets/fonts/GreatVibes-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={[styles.textHeader]}>{name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.children}
        </View>
      </View>
    );
  }
}

export default Option;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: "14%",
  },

  textHeader: {
    color: global.secondaryColor,
    fontSize: 24,
    marginBottom: "7%",
  },
});
