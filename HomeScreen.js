import React, { useState } from "react";
import { Text, View, Button, Platform, Image, StyleSheet } from "react-native";
import Screen from "./Screen";

import global from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

import SideMenu from "react-native-side-menu";
import Sidebar from "./Sidebar";
import { withRouter } from "react-router-native";
import ReadDays from "./ReadDays";
import MissingHeart from "./MissingHeart";

function HomeScreen(props) {
  const [isOpen, setIsOpen] = useState(false);

  const updateMenuState = (isOpen) => {
    setIsOpen(isOpen);
  };

  const menu = <Sidebar />;
  return (
    <SideMenu
      menu={menu}
      isOpen={isOpen}
      onChange={(isOpen) => updateMenuState(isOpen)}
    >
      <Screen>
        <TouchableOpacity
          style={{ left: "5%", marginTop: "5%" }}
          onPress={() => {
            setIsOpen(true);
          }}
        >
          <FontAwesome name="bars" size={24} color={global.secondaryColor} />
        </TouchableOpacity>
        <ReadDays />
        <MissingHeart />
      </Screen>
    </SideMenu>
  );
}

export default withRouter(HomeScreen);
