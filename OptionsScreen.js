import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import Screen from "./Screen";
import Option from "./Option";
import global from "./style";
import firebase from "firebase";
import DefBtn from "./DefBtn";
import DefText from "./DefText";

import DateTimePicker from "@react-native-community/datetimepicker";

function OptionsScreen(props) {
  const [partnerUsername, setPartnerUsername] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  //  const [isDateSet, setIsDateSet] = useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate.getDate());
  };

  const showDatepicker = () => {
    setShow(true);
  };

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

  const handleSaveDays = () => {
    let savedDate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/data/")
      .update({
        date: savedDate,
      })
      .then(() => {
        console.log("update tokena");
      })
      .catch((error) => {
        console.error(error);
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
              fontSize: 24,
            }}
          >
            Options
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Option name={"Partner username"}>
            <TextInput
              style={styles.input}
              value={partnerUsername}
              onChangeText={(e) => setPartnerUsername(e)}
            />
          </Option>
          <Option name={"Set days to meet"}>
            <TouchableOpacity onPress={showDatepicker}>
              <DefText>Click to set</DefText>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                format={"YYYY-MM-DD"}
                displayFormat={"DD MMM YYYY"}
              />
            )}
          </Option>
          <View style={{ width: "100%", position: "absolute", bottom: "5%" }}>
            <TouchableHighlight onPress={() => handleSaveOptions()}>
              <DefBtn value="Zapisz" />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => handleSaveDays()}>
              <DefBtn value="Zapisz dni" />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default OptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 4,
    borderColor: global.primaryColor,
    backgroundColor: global.primaryColor,
  },
  input: {
    width: "75%",
    height: 40,
    color: global.secondaryColor,
    fontSize: 16,
    padding: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: global.secondaryColor,
  },
});
