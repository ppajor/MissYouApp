import React, { useState, useEffect } from "react";
import DefText from "./DefText";
import { View, StyleSheet } from "react-native";
import countDays from "./utils";

import firebase from "firebase";

function ReadDays() {
  const [date, setDate] = useState({});
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/data/")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setDate(data.date);
          setLoading(true);
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
    setDays(
      countDays(
        localDay,
        localMonth,
        localYear,
        date.day,
        date.month,
        date.year
      )
    );
  };

  return (
    <View style={styles.daysToMeetContainer}>
      <DefText size={96}>{days}</DefText>
      <DefText>dni do następnego spotkania</DefText>
    </View>
  );
}

export default ReadDays;

const styles = StyleSheet.create({
  daysToMeetContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "11%",
    marginBottom: "11%",
  },
});
