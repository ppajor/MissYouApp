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
  TouchableWithoutFeedback,
} from "react-native";
import Screen from "./Screen";
import Option from "./Option";
import global from "./style";
import firebase from "firebase";
import DefBtn from "./DefBtn";
import DefText from "./DefText";

import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { countDays } from "./utils";
import ScreenHeader from "./ScreenHeader";

function OptionsScreen(props) {
  const [partnerUsername, setPartnerUsername] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

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

  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        setPartnerUsername(data.partnerUsername);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate.getDate());
  };

  const showDatepicker = () => {
    setShow(true);
    setButtonEnabled(true);
  };

  const handleSaveOptions = () => {
    var localDay = new Date().getDate();
    var localMonth = new Date().getMonth();
    var localYear = new Date().getFullYear();
    let savedDate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    if (
      !countDays(
        localDay,
        localMonth,
        localYear,
        savedDate.day,
        savedDate.month,
        savedDate.year
      ) == 0
    )
      firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid + "/data/")
        .update({
          date: savedDate,
        })
        .then(() => {
          console.log("update date");
        })
        .catch((error) => {
          console.error(error);
        });

    if (inputEnabled) {
      console.log("WTF NYGA");
      firebase
        .database()
        .ref("/usernames/" + partnerUsername)
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
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
          }
        });
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ScreenHeader name="Options" />
        <View style={{ flex: 1, marginTop: "12%" }}>
          <Option name={"Partner username"}>
            <TextInput
              style={[styles.input, !inputEnabled && { color: "#202020" }]}
              editable={inputEnabled}
              value={partnerUsername}
              onChangeText={(e) => setPartnerUsername(e)}
            />
            <TouchableHighlight
              onPress={() => {
                setInputEnabled(true);
                setButtonEnabled(true);
              }}
            >
              <Entypo name="edit" size={24} color={global.secondaryColor} />
            </TouchableHighlight>
          </Option>
          <Option name={"Set days to meet"}>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
              onPress={showDatepicker}
            >
              <DefText family="Roboto-LightItalic">Click to set</DefText>
              <MaterialCommunityIcons
                name="cursor-default-click"
                size={24}
                color={global.secondaryColor}
                style={{ marginLeft: "3%" }}
              />
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
            {buttonEnabled ? (
              <TouchableOpacity onPress={() => handleSaveOptions()}>
                <DefBtn disabled={!buttonEnabled} value="Save" />
              </TouchableOpacity>
            ) : (
              <TouchableWithoutFeedback onPress={() => handleSaveOptions()}>
                <DefBtn disabled={!buttonEnabled} value="Save" />
              </TouchableWithoutFeedback>
            )}
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
    padding: "5%",
    backgroundColor: global.primaryColor,
  },
  input: {
    width: "75%",
    height: 40,
    marginRight: "3%",
    color: global.secondaryColor,
    fontSize: 16,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: global.secondaryColor,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#202020",
    padding: "5%",
  },
});
