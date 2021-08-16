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

function SetPartnerUsername(props) {
  const [partnerUsername, setPartnerUsername] = useState(
    "Your partner username..."
  );
  const [username, setUsername] = useState("");
  const [partnerUsernameError, setPartnerUsernameError] = useState(false);
  const [partnerToken, setPartnerToken] = useState("");
  const [redirect, setRedirect] = useState(false);

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
    console.log("Partner username to find: " + partnerUsername);
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
              setPartnerToken(partnerToken);
              //setRedirect(true);
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
        <TextInput
          style={styles.input}
          value={partnerUsername}
          onChangeText={(e) => {
            setPartnerUsername(e);
          }}
        />
        <TouchableHighlight onPress={(e) => handleOnPress(e)}>
          <Image source={require("./assets/arrowRight.png")} />
        </TouchableHighlight>

        {partnerUsernameError && (
          <Text style={{ color: "red" }}>
            Partner username is not valid. Please try again.
          </Text>
        )}
        {redirect &&
          (() => {
            console.log("USERNAME =>" + username);
          })}
      </View>
    );
  }
}

export default withRouter(SetPartnerUsername);

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
