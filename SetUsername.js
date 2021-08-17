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
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Username..."
          placeholderTextColor={global.secondaryColor}
          onChangeText={(e) => setUsername(e)}
        />
        <TouchableHighlight onPress={() => handleClick()}>
          <Image source={require("./assets/arrowRight.png")} />
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
