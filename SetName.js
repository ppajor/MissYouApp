import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  BackHandler,
  TouchableHighlight,
  Image,
} from "react-native";
import global from "./style";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function SetUsername(props) {
  const [name, setName] = useState("Your name...");

  useEffect(() => {
    console.log("ELO");

    const backAction = () => {
      props.history.push("/"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  let [fontsLoaded] = useFonts({
    "GreatVibes-Regular": require("./assets/fonts/GreatVibes-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={[styles.textHeader, { fontFamily: "GreatVibes-Regular" }]}>
          Enter your name
        </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(e) => setName(e)}
        />
        <TouchableHighlight
          onPress={() =>
            props.history.push({
              pathname: "/SetUsername",
              state: {
                name: name,
              },
            })
          }
        >
          <Image source={require("./assets/arrowRight.png")} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default SetUsername;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: "59%",
    height: "100%",
    backgroundColor: global.primaryColor,
  },
  textHeader: {
    color: global.secondaryColor,
    fontSize: 48,
    marginBottom: "25%",
  },
  input: {
    width: "75%",
    height: 60,
    color: global.secondaryColor,
    fontSize: 18,
    padding: 16,
    marginBottom: "45%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: global.secondaryColor,
  },
});
