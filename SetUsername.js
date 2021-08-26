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
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  let name = props.location.state.name;

  useEffect(() => {
    console.log("NAme:" + name);

    const backAction = () => {
      props.history.push("/SetName"); //wracamy do glownej
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
      pathname: "/SetPartnerUsername",
      state: {
        name: name,
        username: username,
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
          Enter your username
        </Text>

        <DefInput
          value={username}
          placeholder="Username..."
          onChange={(e) => setUsername(e)}
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
        {error && (
          <Text style={{ color: "red" }}>
            We have got this username in database. Please enter valid username
          </Text>
        )}
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
  nextIcon: {
    position: "absolute",
    bottom: "10%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
