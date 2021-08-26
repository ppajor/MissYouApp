import React, { useEffect, useState } from "react";
import DefText from "./DefText";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { quotes } from "./quotes";

function Quote() {
  const [date, setDate] = useState("");

  useEffect(() => {
    var localDay = new Date().getDate();
    var localMonth = new Date().getMonth() + 1;
    var localYear = new Date().getFullYear();
    setDate(localDay + "/" + localMonth + "/" + localYear);
  }, []);

  return (
    <View style={styles.quoteContainer}>
      <DefText align="center" bold size={24}>
        Cytat dnia
      </DefText>
      <View style={{ padding: "10%" }}>
        <View style={styles.quoteIcon}>
          <FontAwesome name="quote-right" size={80} color="#202020" />
        </View>
        <View style={{ marginBottom: "5%" }}>
          <DefText family="GreatVibes-Regular" size={28} color="#B0B0B0">
            {date != "" && quotes[date].quote}
          </DefText>
        </View>
        <DefText size={14} align="right" color="#B0B0B0">
          ~ {date != "" && quotes[date].author}
        </DefText>
      </View>
    </View>
  );
}

export default Quote;

const styles = StyleSheet.create({
  quoteContainer: {
    width: "100%",
    marginTop: "15%",
  },
  quoteIcon: {
    position: "absolute",
    left: "5%",
    top: "10%",
  },
});
