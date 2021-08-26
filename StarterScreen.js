import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import global from "./style";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { TouchableHighlight } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import Screen from "./Screen";

export default function Loading(props) {
  let [fontsLoaded] = useFonts({
    "GreatVibes-Regular": require("./assets/fonts/GreatVibes-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Screen>
        <View style={styles.container}>
          <Image source={require("./assets/logoL.png")} />
          <Text style={[styles.logoText, { fontFamily: "GreatVibes-Regular" }]}>
            MissYouApp
          </Text>
          <TouchableHighlight
            style={{ marginTop: 160 }}
            onPress={() => props.history.push("/SetName")}
          >
            <LottieView
              style={{
                width: 50,
                height: 50,

                backgroundColor: "#101010",
              }}
              source={require("./assets/right_arrow")}
              loop
              autoPlay
            />
          </TouchableHighlight>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    paddingTop: "30%",
    alignItems: "center",
    backgroundColor: global.primaryColor,
  },
  logoText: {
    color: global.secondaryColor,
    fontSize: 48,
  },
  nextIcon: {
    position: "relative",
  },
});
