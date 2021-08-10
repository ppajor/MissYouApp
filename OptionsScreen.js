import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  BackHandler,
} from "react-native";
import Screen from "./Screen";
import Option from "./Option";
import global from "./style";
import firebase from "firebase";

function OptionsScreen(props) {
  const [partnerUsername, setPartnerUsername] = useState("");

  useEffect(() => {
    const backAction = () => {
      props.history.push("/HomeScreen"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  const handleSaveOptions = () => {
    firebase
      .database()
      .ref("/usernames/" + partnerUsername)
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        let token = data.token;

        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .update({
            partnerUsername: partnerUsername,
            partnerToken: token,
          })
          .then(() => {
            console.log("update tokena");
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#202020",
            marginBottom: "12%",
            padding: "5%",
          }}
        >
          <Text
            style={{
              color: global.secondaryColor,
              fontSize: 28,
            }}
          >
            Options
          </Text>
        </View>

        <Option
          name={"Partner username"}
          partnerUsername={partnerUsername}
          handlePartnerUsername={(e) => setPartnerUsername(e)}
        />
        <TouchableHighlight onPress={() => handleSaveOptions()}>
          <Image source={require("./assets/arrowRight.png")} />
        </TouchableHighlight>
      </View>
    </Screen>
  );
}

export default OptionsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.primaryColor,
  },
});
