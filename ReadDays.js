import React, { useState, useEffect } from "react";
import DefText from "./DefText";
import { View, StyleSheet } from "react-native";
import { countDays } from "./utils";
import LottieView from "lottie-react-native";

import firebase from "firebase";

function ReadDays(props) {
  const [date, setDate] = useState({});
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [emoji, setEmoji] = useState(
    require("./assets/56472-emoji-29-poker-face.json")
  );

  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/data/")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setDate(data.date);
          setLoading(false);
          setDaysToMeet();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loading]);

  const setDaysToMeet = () => {
    var localDay = new Date().getDate();
    var localMonth = new Date().getMonth();
    var localYear = new Date().getFullYear();
    let howManyDays = countDays(
      localDay,
      localMonth,
      localYear,
      date.day,
      date.month,
      date.year
    );
    setDays(howManyDays);
    chooseEmoji(howManyDays);
  };

  const chooseEmoji = (days) => {
    if (days > 20) {
      setEmoji(require("./assets/10119-crying-emoji"));
    }
    if (days <= 20 && days >= 10) {
      setEmoji(require("./assets/10304-rolling-eyes-emoji"));
    }
    if (days < 10) {
      setEmoji(require("./assets/10969-star-strike-emoji"));
    }
  };

  return (
    <View style={styles.daysToMeetContainer}>
      {!loading && !isNaN(days) && (
        <>
          <LottieView
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#101010",
              position: "absolute",
              left: "5%",
              top: "0%",
            }}
            source={emoji} //conditionale robimy poza sourcem bo inaczej nie działa
            loop
            autoPlay
          />
          <LottieView
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#101010",
              position: "absolute",
              left: "55%",
              top: "35%",
            }}
            source={emoji} //conditionale robimy poza sourcem bo inaczej nie działa
            loop
            autoPlay
          />
          <DefText size={96}>{days}</DefText>
          <DefText>dni do następnego spotkania</DefText>
        </>
      )}
    </View>
  );
}

export default ReadDays;

const styles = StyleSheet.create({
  daysToMeetContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "11%",
    marginBottom: "11%",
  },
});
