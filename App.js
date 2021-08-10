import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Switch, MemoryRouter } from "react-router-native"; //dzieki memoryrouter mozna uzywać historii w Child componentach, na normalnym routerze historia dziala jedynie w parent componentach

import firebase from "firebase";
import { firebaseConfig } from "./firebase-config";

import SetName from "./SetName";
import SetUsername from "./SetUsername";
import SetPartnerUsername from "./SetPartnerUsername";
import StarterScreen from "./StarterScreen";
import HomeScreen from "./HomeScreen";
import LoadingScreen from "./LoadingScreen";
import OptionsScreen from "./OptionsScreen";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig); //musimy sprawdzic czy aplikacja zostala juz zainicjowana czy nie, zeby za kazdym razem nie inicjowac apki

export default function App() {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={LoadingScreen} />
        <Route exact path="/StarterScreen" component={StarterScreen} />
        <Route exact path="/SetName" component={SetName} />
        <Route exact path="/SetUsername" component={SetUsername} />
        <Route
          exact
          path="/SetPartnerUsername"
          component={SetPartnerUsername}
        />
        <Route exact path="/HomeScreen" component={HomeScreen} />
        <Route exact path="/OptionsScreen" component={OptionsScreen} />
      </Switch>
    </MemoryRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});