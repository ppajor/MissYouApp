import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import global from "./style";

function Option({ name, partnerUsername, handlePartnerUsername }) {
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
        <TextInput
          style={styles.input}
          value={partnerUsername}
          onChangeText={handlePartnerUsername}
        />
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
  input: {
    width: "75%",
    height: 40,
    color: global.secondaryColor,
    fontSize: 16,
    padding: 8,
    marginBottom: "10%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: global.secondaryColor,
  },
});
