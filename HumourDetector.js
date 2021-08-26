import React, { useState, useEffect } from "react";
import Screen from "./Screen";
import ScreenHeader from "./ScreenHeader";
import { View, StyleSheet, BackHandler, Modal, Alert } from "react-native";
import LottieView from "lottie-react-native";
import DefText from "./DefText";
import { TouchableOpacity } from "react-native-gesture-handler";
import HumourNotification from "./HumourNotification";

const lottieFiles = [
  {
    emotion: "bardzo źle",
    emoji: require("./assets/10119-crying-emoji"),
  },
  {
    emotion: "źle",
    emoji: require("./assets/28443-sad-emoji"),
  },
  {
    emotion: "średnio",
    emoji: require("./assets/10254-raised-eyebrow-emoji"),
  },
  {
    emotion: "w porządku",
    emoji: require("./assets/10164-blushing-emoji"),
  },
  {
    emotion: "dobrze",
    emoji: require("./assets/28107-smiley-emoji-2"),
  },
  {
    emotion: "bardzo dobrze",
    emoji: require("./assets/10969-star-strike-emoji"),
  },
];

function HumourDetector(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [emojiClicked, setEmojiClicked] = useState(null);

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
      <View style={styles.container}>
        <ScreenHeader name="Humour Detector" />
        <View style={styles.containerBody}>
          <View style={{ width: "100%", position: "absolute", top: "15%" }}>
            <DefText align="center" size={24}>
              JAK SIĘ TERAZ CZUJESZ?
            </DefText>
          </View>

          {lottieFiles.map((el, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={{ marginTop: "10%", backgroundColor: "#101010" }}
                onPress={() => {
                  setModalOpen(true);
                  setEmojiClicked(el);
                }}
              >
                <LottieView
                  style={{
                    width: 100,
                    height: 100,

                    backgroundColor: "#101010",
                  }}
                  source={el.emoji}
                  loop
                  autoPlay
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalOpen(!modalOpen);
          }}
        >
          <HumourNotification emojiData={emojiClicked} />
        </Modal>
      </View>
    </Screen>
  );
}

export default HumourDetector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  containerBody: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
});
