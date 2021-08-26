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
import { withRouter, Redirect, useLocation } from "react-router-native";
import global from "./style";
import firebase from "firebase";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DefInput from "./DefInput";
import LottieView from "lottie-react-native";

function SetPartnerUsername(props) {
  const [partnerUsername, setPartnerUsername] = useState("");
  const [username, setUsername] = useState("");
  const [partnerUsernameError, setPartnerUsernameError] = useState(false);
  const [partnerToken, setPartnerToken] = useState("");

  useEffect(() => {
    setUsername(props.location.state.username);
    console.log(props.location.state.username);
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
    var partnerToken;
    ref.child("usernames/" + partnerUsername).once("value", (snapshot) => {
      // jesli partner istnieje to wez jego token
      if (snapshot.exists()) {
        let data = snapshot.val();
        partnerToken = data.token;
        saveUserToDb(partnerToken);
      } else {
        setPartnerUsernameError(true);
        error = true;
      }
    });

    function saveUserToDb(partnerToken) {
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
              console.log(
                "Data updated. and: username is: " +
                  username +
                  "partner topken is:" +
                  partnerToken
              );
              props.history.push({
                pathname: "/HomeScreen",
              });
              setPartnerToken(partnerToken);
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
    }
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

        <DefInput
          value={partnerUsername}
          placeholder="Your partner username..."
          onChange={(e) => setPartnerUsername(e)}
        />
        <TouchableHighlight
          style={styles.nextIcon}
          onPress={() => handleOnPress()}
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

        {partnerUsernameError && (
          <Text style={{ color: "red" }}>
            Partner username is not valid. Please try again.
          </Text>
        )}
      </View>
    );
  }
}

export default withRouter(SetPartnerUsername);

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
    textAlign: "center",
  },
  nextIcon: {
    position: "absolute",
    bottom: "10%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
