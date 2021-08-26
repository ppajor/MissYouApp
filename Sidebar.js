import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase";
import Screen from "./Screen";
import global from "./style";

import { withRouter } from "react-router-native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import DefText from "./DefText";

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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "15%",
              marginTop: "5%",
            }}
          >
            <DefText family="GreatVibes-Regular" size={36}>
              MissYouApp
            </DefText>
            <FontAwesome name="heart" size={18} color="#ff006d" />
          </View>

          <TouchableOpacity onPress={() => props.history.push("/HomeScreen")}>
            <Text style={styles.li}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.history.push("/OptionsScreen")}
          >
            <Text style={styles.li}>OPTIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.history.push("/Gallery")}>
            <Text style={styles.li}>GALLERY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.history.push("/HumourDetector")}
          >
            <Text style={styles.li}>HUMOUR DETECTOR</Text>
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
