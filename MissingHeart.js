import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import DefText from "./DefText";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function MissingHeart() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    console.log("AKTUALNY USER: " + firebase.auth().currentUser.uid);
    registerForPushNotificationsAsync().then((token) => {
      console.log("TOKEN FUNCTION");
      setExpoPushToken(token);
      var username;
      firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .once("value")
        .then((snapshot) => {
          let data = snapshot.val();

          username = data.username;
          console.log("username is: " + username);
          firebase
            .database()
            .ref("/usernames/" + username)
            .update({
              token: token,
            })
            .then(() => {
              console.log("username  3: " + username);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
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

  return (
    <View style={styles.heartContainer}>
      <DefText center family="Roboto-LightItalic">
        Pokaż swojej drugiej połówce jak bardzo tęsknisz
      </DefText>
      <TouchableOpacity
        onPress={async () => {
          await schedulePushNotification();
        }}
        style={{ marginTop: 25 }}
      >
        <Image source={require("./assets/heart-medium.png")} />
      </TouchableOpacity>
    </View>
  );
}

async function schedulePushNotification() {
  firebase
    .database()
    .ref("/users/" + firebase.auth().currentUser.uid)
    .once("value")
    .then((snapshot) => {
      let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
      console.log("partner token from database:" + data.partnerToken);
      let token = data.partnerToken;
      const message = {
        to: token,
        sound: "default",
        title: data.name + " bardzo tęskni",
        body: "Odezwij się do mnie :(",
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

  console.log("TOKENIK WCZESNIEJSZY: " + token);
  return token;
}

export default MissingHeart;

const styles = StyleSheet.create({
  heartContainer: {
    alignItems: "center",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 25,

    backgroundColor: "#1F1E1E",
    borderRadius: 25,
  },
});
