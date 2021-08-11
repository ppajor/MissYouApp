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
        <Text style={[styles.textHeader, { fontFamily: "GreatVibes-Regular" }]}>
          {name}
        </Text>
        {props.children}
      </View>
    );
  }
}

export default Option;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },

  textHeader: {
    color: global.secondaryColor,
    fontSize: 32,
    marginBottom: "10%",
  },
});
