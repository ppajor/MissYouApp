import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import firebase from "firebase";

import DefText from "./DefText";

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
  let heart = null;

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
              // console.log("username  3: " + username);
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

  const animationPlay = () => {
    heart.play(0, 30);
  };

  return (
    <View style={styles.heartContainer}>
      <DefText align="center" family="Roboto-LightItalic">
        Poka?? swojej drugiej po????wce jak bardzo t??sknisz
      </DefText>
      <TouchableOpacity
        onPress={async () => {
          await schedulePushNotification();
          animationPlay();
        }}
        style={{ marginTop: 25 }}
      >
        <LottieView
          ref={(animation) => {
            heart = animation;
          }}
          style={{
            width: 250,
            height: 250,
            backgroundColor: "#202020",
          }}
          source={require("./assets/73495-heart.json")}
          loop={false}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
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
      //console.log("partner token from database:" + data.partnerToken);
      let token = data.partnerToken;
      const message = {
        to: token,
        sound: "default",
        title: data.name + " bardzo t??skni",
        body: "Odezwij si?? do mnie :(",
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

export default MissingHeart;

const styles = StyleSheet.create({
  heartContainer: {
    alignItems: "center",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 25,

    backgroundColor: "#202020",
    borderRadius: 25,
  },
});
