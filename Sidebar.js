import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase";
import Screen from "./Screen";
import global from "./style";

import { withRouter } from "react-router-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function Sidebar(props) {
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        props.history.push("/StarterScreen");
      });
  };

  let [fontsLoaded] = useFonts({
    "GreatVibes-Regular": require("./assets/fonts/GreatVibes-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Screen>
        <View
          style={{
            height: "100%",
            padding: "5%",
            borderRightWidth: 5,
            borderRightColor: "#202020",
            backgroundColor: "#202020",
          }}
        >
          <Text
            style={{
              fontFamily: "GreatVibes-Regular",
              fontSize: 36,
              color: global.secondaryColor,
              marginBottom: "15%",
              marginTop: "5%",
            }}
          >
            MissYouApp
          </Text>
          <TouchableOpacity
            onPress={() => props.history.push("/OptionsScreen")}
          >
            <Text style={styles.li}>PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.history.push("/OptionsScreen")}
          >
            <Text style={styles.li}>OPTIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.li}>WYLOGUJ</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}

export default withRouter(Sidebar); //zeby dzialalo history push

const styles = StyleSheet.create({
  li: {
    marginTop: "5%",
    color: "#505050",
    fontSize: 18,
  },
});
