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
import firebase from "firebase";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function SetPartnerUsername(props) {
  const [partnerUsername, setPartnerUsername] = useState(
    "Your partner username..."
  );
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(
      "Imie:" +
        props.location.state.name +
        "Username:" +
        props.location.state.username
    );
    setUsername(props.location.state.username);

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

  const handleOnPress = () => {
    const ref = firebase.database().ref();
    let partnerToken;
    ref.child("usernames/" + partnerUsername).once("value", (snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        partnerToken = data.token;
      }
      console.log("partner:" + partnerToken);
    });

    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("User signed in anonymously");
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .update({
            id: firebase.auth().currentUser.uid,
            name: props.location.state.name,
            username: username,
            partnerUsername: partnerUsername,
            partnerToken: partnerToken,
          })
          .then(() => {
            console.log("Data updated. and: username is: " + username);
            props.history.push({
              pathname: "/HomeScreen",
              state: {
                username: username,
              },
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
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
          Enter your partner username
        </Text>
        <TextInput
          style={styles.input}
          value={partnerUsername}
          onChangeText={(e) => setPartnerUsername(e)}
        />
        <TouchableHighlight onPress={() => handleOnPress()}>
          <Image source={require("./assets/arrowRight.png")} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default SetPartnerUsername;

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
    marginBottom: "10%",
    textAlign: "center",
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