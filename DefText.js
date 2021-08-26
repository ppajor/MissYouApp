import React, { Children } from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import global from "./style";

function DefText(props) {
  const {
    family = "Roboto-Regular",
    size = 18,
    align = "left",
    bold = false,
    color = global.secondaryColor,
    ...rest
  } = props; //definiujemy defaultowe wartosci propsow

  let [fontsLoaded] = useFonts({
    //wczytujemy fonty

    "GreatVibes-Regular": require("./assets/fonts/GreatVibes-Regular.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text
        style={{
          fontSize: size,
          fontFamily: family,
          color: color,
          textAlign: align,
          fontWeight: bold ? "bold" : "400",
        }}
      >
        {props.children}
      </Text>
    );
  }
}

export default DefText;
