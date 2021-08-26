import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Screen from "./Screen";
import DefText from "./DefText";
import globals from "./style";
import ScreenHeader from "./ScreenHeader";

function Gallery(props) {
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

  return (
    <Screen>
      <View style={styles.galleryContainer}>
        <ScreenHeader name="Gallery" />
        <View style={styles.galleryBody}>
          <TouchableOpacity onPress={() => props.history.push("/AddAlbum")}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="library-add"
                size={84}
                color={globals.secondaryColor}
              />
              <DefText size={48}>Dodaj Album</DefText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

export default Gallery;

const styles = StyleSheet.create({
  galleryContainer: {
    width: "100%",
    height: "100%",
    padding: "5%",
  },
  galleryBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
