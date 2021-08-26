import React, { useState, useEffect, useRef } from "react";
import Constants from "expo-constants";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import firebase from "firebase";
import LottieView from "lottie-react-native";
import globals from "./style";
import Screen from "./Screen";
import DefInput from "./DefInput";
import DefBtn from "./DefBtn";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HumourNotification(props) {
  const { emojiData } = props;
  const [inputVal, setInputVal] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
  }, []);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleOnChange = (e) => {
    setInputVal(e);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <LottieView
          style={{
            width: 200,
            height: 200,

            backgroundColor: "#101010",
          }}
          source={emojiData.emoji}
          loop
          autoPlay
        />

        <DefInput
          value={inputVal}
          placeholder="Tell me why you're feeling it..."
          onChange={handleOnChange}
        />
        <TouchableOpacity
          style={{ width: "100%", marginTop: "10%" }}
          onPress={async () => {
            await schedulePushNotification(inputVal, emojiData.emotion);
          }}
        >
          <DefBtn value="Send notification" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

async function schedulePushNotification(bodyValue, emotion) {
  firebase
    .database()
    .ref("/users/" + firebase.auth().currentUser.uid)
    .once("value")
    .then((snapshot) => {
      let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
      //console.log("partner token from database:" + data.partnerToken);
      let token = data.partnerToken;
      const message = {
        to: token,
        sound: "default",
        title: "Czuję się " + emotion,
        body: bodyValue,
        data: { someData: "goes here" },
      };

      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  //console.log("TOKENIK WCZESNIEJSZY: " + token);
  return token;
}

export default HumourNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    display: "flex",
    alignItems: "center",
    paddingTop: "30%",
  },
  input: {
    width: "90%",
    height: 50,
    color: globals.secondaryColor,
    fontSize: 16,
    padding: 16,
    marginTop: "15%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: globals.secondaryColor,
  },
});
