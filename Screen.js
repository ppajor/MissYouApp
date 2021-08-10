import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import global from "./style";

export default function Screen(props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.primaryColor,
    paddingTop: Constants.statusBarHeight,
  },
});
