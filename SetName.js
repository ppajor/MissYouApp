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
import DefInput from "./DefInput";
import LottieView from "lottie-react-native";

function SetUsername(props) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
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

  const handleClick = () => {
    if (name === "") {
      console.log("error");
      setError(true);
      return;
    }
    props.history.push({
      pathname: "/SetUsername",
      state: {
        name: name,
      },
    });
  };

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

        <DefInput
          value={name}
          placeholder="Name..."
          onChange={(e) => setName(e)}
        />

        <TouchableHighlight
          style={styles.nextIcon}
          onPress={() => handleClick()}
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
        {error && <Text style={{ color: "red" }}>Please enter a name.</Text>}
      </View>
    );
  }
}

export default SetUsername;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: global.primaryColor,
  },
  textHeader: {
    color: global.secondaryColor,
    fontSize: 48,
    marginBottom: "15%",
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
  nextIcon: {
    position: "absolute",
    bottom: "10%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
